import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import lodash from 'lodash';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import { push } from 'connected-react-router';
//
import reducer from './reducer';
import * as noteActions from './actions';
import injectReducer from 'utils/injectReducer';
import { Wrapper, NoDataWrapper, CreateNoteWrapper } from './index.styled';
import NotesTable from 'components/NotesTable';
import NewNote from 'components/NewNote';


@connect(mapStateToProps, mapDispatchToProps)
class AdminNotesPage extends React.PureComponent {
  applicationId = null;
  errorsIds = [];

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.errorsHandler({ prevProps, prevState, snapshot });
  }

  componentDidMount() {
    this.applicationId = lodash.get(this, 'props.match.params.applicationId', null);
    const { loadNotes, updateFilter, location } = this.props;
    const query = queryString.parse(location.search);

    if (Object.keys(query).length > 0) {
      updateFilter(query);
    }

    loadNotes(this.applicationId);
  }

  errorsHandler = () => {
    const application = lodash.get(this, 'props.application', {});

    if (application.error && !this.errorsIds.includes(application.error.id)) {
      const message = lodash.get(application, 'error.message', 'Unexpected error, please try later.');
      this.errorsIds.push(application.error.id);
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  getContent = () => {
    const { notes } = this.props.application;
    const count = lodash.get(notes, 'meta.count', 0);
    const pageSize = 10;

    if (!count && !notes.loading) {
      return (
        <NoDataWrapper>
          <h2>No data</h2>
        </NoDataWrapper>
      );
    }

    return (
      <NotesTable data={notes}
                  loading={notes.loading}
                  pageSize={pageSize}
                  onChange={(props) => this.appsTableOnChange({pageSize, ...props})} />
    );
  };

  appsTableOnChange = (props = {}) => {
    const { loadNotes, location, push } = this.props;
    const { page, pageSize } = props;
    loadNotes({ page: page - 1, limit: pageSize });
    push(`${location.pathname}?page=${page - 1}`);
  };

  createNoteHandler = (values) => {
    const { application, loadNotes, createNote } = this.props;
    createNote(values).then(() => {
      const filter = lodash.get(application, 'notes.filter', {});
      loadNotes(filter);
    });
  };

  render() {
    const { notesEdit } = this.props;
    const createNoteLoading = lodash.get(notesEdit, 'createNoteLoading.loading', false);

    return (
      <article>
        <Helmet>
          <title>Application</title>
          <meta
            name="description"
            content="Application Release Notes"
          />
        </Helmet>
        <Wrapper>
          <CreateNoteWrapper>
            <NewNote onSubmit={this.createNoteHandler} loading={createNoteLoading} />
          </CreateNoteWrapper>
          {this.getContent()}
        </Wrapper>
      </article>
    );
  }
}

function mapStateToProps(state = {}) {
  const { notesEdit } = state;
  return { notesEdit };
}

function mapDispatchToProps (dispatch) {
  return {
    push: bindActionCreators(push, dispatch),
    createApplication: bindActionCreators(noteActions.createNote, dispatch),
    loadNotes: bindActionCreators(noteActions.loadNotes, dispatch),
    updateFilter: bindActionCreators(noteActions.updateFilter, dispatch)
  };
}

const withReducer = injectReducer({ key: 'notesEdit', reducer });

export default compose(
  withReducer,
)(AdminNotesPage);
