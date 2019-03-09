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
import * as publicNotesActions from './actions';
import injectReducer from '../../utils/injectReducer';
import { Wrapper } from './index.styled';
import { NoDataWrapper } from './index.styled';
import PublicNotesTable from 'components/PublicNotesTable';


const defaultErrorMessage = 'Unexpected error, please try later.';

@connect(mapStateToProps, mapDispatchToProps)
class PublicNotesPage extends React.PureComponent {
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
    const publicNotes = lodash.get(this, 'props.publicNotes', {});

    if (publicNotes.error && !this.errorsIds.includes(publicNotes.error.id)) {
      const message = lodash.get(publicNotes, 'error.message', defaultErrorMessage);
      this.errorsIds.push(publicNotes.error.id);
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  getTableContent = () => {
    const { notes } = this.props.publicNotes;
    const count = lodash.get(notes, 'meta.count', 0);
    const query = queryString.parse(this.props.location.search);
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
      <PublicNotesTable
        data={notes}
        loading={notes.loading}
        pageSize={pageSize}
        defaultCurrent={currentPage + 1}
        onChangePublish={this.tableOnChange}/>
    );
  };

  tableOnChange = (props = {}) => {
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

  render() {
    const { publicNotes } = this.props;
    const { application } = publicNotes;
    const loadApplicationLoading = lodash.get(publicNotes, 'application.loading', false);

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
          <h1>
            {loadApplicationLoading
              ? <Icon type="loading"/>
              : `Application: ${application.data.name} | ID: ${application.data.id}`
            }
          </h1>
          {this.getTableContent()}
        </Wrapper>
      </article>
    );
  }
}

function mapStateToProps(state = {}) {
  const { publicNotes } = state;
  return { publicNotes };
}

function mapDispatchToProps (dispatch) {
  return {
    push: bindActionCreators(push, dispatch),
    loadNotes: bindActionCreators(publicNotesActions.loadNotes, dispatch),
    clearNotes: bindActionCreators(publicNotesActions.clearNotes, dispatch),
    loadApplication: bindActionCreators(publicNotesActions.loadApplication, dispatch)
  };
}

const withReducer = injectReducer({ key: 'publicNotes', reducer });

export default compose(
  withReducer,
)(PublicNotesPage);
