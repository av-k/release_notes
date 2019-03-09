import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { push } from 'connected-react-router'
import lodash from 'lodash';
import { Icon } from 'antd';
import { toast } from 'react-toastify';
import queryString from 'query-string';
//
import reducer from './reducer';
import * as adminNotesActions from './actions';
import injectReducer from '../../utils/injectReducer';
import { Wrapper, CreateNoteWrapper } from './index.styled';
import CreateNoteButton from 'components/CreateNoteButton';
import { NoDataWrapper } from './index.styled';
import AdminNotesTable from 'components/AdminNotesTable';

const DATE_FORMAT = 'YYYY-MM-DD';
const defaultErrorMessage = 'Unexpected error, please try later.';

@connect(mapStateToProps, mapDispatchToProps)
class AdminNotesPage extends React.PureComponent {
  applicationId = null;
  errorsIds = [];

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.errorsHandler({ prevProps, prevState, snapshot });
  }

  componentDidMount() {
    const queryParams = this.getFilterParamsFromQuery();
    this.applicationId = queryParams.applicationId;
    this.props.loadApplication(this.applicationId);
    this.props.loadNotes(queryParams);
  }

  componentWillUnmount() {
    this.props.clearNotes();
  }

  getFilterParamsFromQuery = () => {
    const { location } = this.props;
    return queryString.parse(location.search);
  };

  errorsHandler = () => {
    const adminNotes = lodash.get(this, 'props.adminNotes', {});

    if (adminNotes.error && !this.errorsIds.includes(adminNotes.error.id)) {
      const message = lodash.get(adminNotes, 'error.message', defaultErrorMessage);
      this.errorsIds.push(adminNotes.error.id);
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  getTableContent = () => {
    const { notes } = this.props.adminNotes;
    const count = lodash.get(notes, 'meta.count', 0);
    const query = queryString.parse(location.search);
    const pageSize = 10;
    const currentPage = query.page ? +query.page : 0;

    if (!count && !notes.loading) {
      return (
        <NoDataWrapper>
          <h2>No data</h2>
        </NoDataWrapper>
      );
    }

    return (
      <AdminNotesTable
        data={notes}
        loading={notes.loading}
        pageSize={pageSize}
        defaultCurrent={currentPage + 1}
        onChangePublish={this.onChangePublish}
        onEdit={this.editNoteHandler}
        onDelete={this.deleteNoteHandler}
        onChange={(props) => this.appsTableOnChange({pageSize, ...props})} />
    );
  };

  appsTableOnChange = (props = {}) => {
    const { loadNotes, location, push } = this.props;
    const { page, pageSize } = props;
    const queryParams = this.getFilterParamsFromQuery();
    const filterProps = {
      ...queryParams,
      page: page - 1, limit: pageSize
    };
    const newQuery = queryString.stringify(filterProps);
    loadNotes(filterProps);
    push(`${location.pathname}?${newQuery}`);
  };

  onChangePublish = (props = {}) => {
    const { id, published } = props;
    this.editNoteHandler({ id, published });
  };

  createNoteHandler = (props = {}) => {
    const { loadNotes, createNote } = this.props;
    const payload = {
      ...props,
      applicationId: this.applicationId,
      published: props.published == 1,
      releaseDate: props.releaseDate.format(DATE_FORMAT)
    };

    createNote(payload).then((response = {}) => {
      if (!response.error) {
        const queryParams = this.getFilterParamsFromQuery();
        loadNotes(queryParams);
        toast.info(`Note was created.`, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    });
  };

  editNoteHandler = (props = {}) => {
    const { id, version, description } = props;
    const { loadNotes, editNote } = this.props;
    const payload = {
      version,
      description,
      published: props.published == 1,
      releaseDate: props.releaseDate.format(DATE_FORMAT)
    };

    editNote(id, payload).then((response = {}) => {
      if (!response.error) {
        const queryParams = this.getFilterParamsFromQuery();
        loadNotes(queryParams);
        toast.info(`Note with ID "${id}" was edited.`, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    });
  };

  deleteNoteHandler = (props = {}) => {
    const { id } = props;
    const { loadNotes, deleteNote } = this.props;

    deleteNote(id).then((response = {}) => {
      if (!response.error) {
        const queryParams = this.getFilterParamsFromQuery();
        loadNotes(queryParams);
        toast.info(`Note with ID "${id}" was deleted.`, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    });
  };

  render() {
    const { adminNotes } = this.props;
    const { application } = adminNotes;
    const createApplicationLoading = lodash.get(adminNotes, 'createNote.loading', false);
    const loadApplicationLoading = lodash.get(adminNotes, 'application.loading', false);

    return (
      <article>
        <Helmet>
          <title>Administration Panel</title>
          <meta
            name="description"
            content="Administration Panel"
          />
        </Helmet>
        <Wrapper>
          <CreateNoteWrapper>
            <h1>
              {loadApplicationLoading
                ? <Icon type="loading"/>
                : `Application: ${application.data.name} | ID: ${application.data.id}`
              }
            </h1>
            <CreateNoteButton onSubmit={this.createNoteHandler} loading={createApplicationLoading} />
          </CreateNoteWrapper>
          {this.getTableContent()}
        </Wrapper>
      </article>
    );
  }
}

function mapStateToProps(state = {}) {
  const { adminNotes } = state;
  return { adminNotes };
}

function mapDispatchToProps (dispatch) {
  return {
    push: bindActionCreators(push, dispatch),
    createNote: bindActionCreators(adminNotesActions.createNote, dispatch),
    editNote: bindActionCreators(adminNotesActions.editNote, dispatch),
    deleteNote: bindActionCreators(adminNotesActions.deleteNote, dispatch),
    loadNotes: bindActionCreators(adminNotesActions.loadNotes, dispatch),
    clearNotes: bindActionCreators(adminNotesActions.clearNotes, dispatch),
    loadApplication: bindActionCreators(adminNotesActions.loadApplication, dispatch)
  };
}

const withReducer = injectReducer({ key: 'adminNotes', reducer });

export default compose(
  withReducer,
)(AdminNotesPage);
