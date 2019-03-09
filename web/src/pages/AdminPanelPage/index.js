import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { push } from 'connected-react-router'
import { Divider } from 'antd';
import lodash from 'lodash';
import { toast } from 'react-toastify';
import queryString from 'query-string';
//
import reducer from './reducer';
import * as adminPanelActions from './actions';
import injectReducer from '../../utils/injectReducer';
import { Wrapper, CreateApplicationWrapper } from './index.styled';
import CreateApplicationButton from 'components/CreateApplicationButton';
import { NoDataWrapper } from './index.styled';
import AdminApplicationsTable from '../../components/AdminApplicationsTable';

const defaultErrorMessage = 'Unexpected error, please try later.';

@connect(mapStateToProps, mapDispatchToProps)
class AdminPanelPage extends React.PureComponent {
  errorsIds = [];

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.errorsHandler({ prevProps, prevState, snapshot });
  }

  componentDidMount() {
    this.queryFilterHandler();
  }

  queryFilterHandler = () => {
    const { updateFilter, loadApplications, location } = this.props;
    const query = queryString.parse(location.search);

    if (Object.keys(query).length > 0) {
      updateFilter(query);
    }

    loadApplications();
  };

  errorsHandler = () => {
    const adminPanel = lodash.get(this, 'props.adminPanel', {});

    if (adminPanel.error && !this.errorsIds.includes(adminPanel.error.id)) {
      const message = lodash.get(adminPanel, 'error.message', defaultErrorMessage);
      this.errorsIds.push(adminPanel.error.id);
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  getTableContent = () => {
    const { applications } = this.props.adminPanel;
    const count = lodash.get(applications, 'meta.count', 0);
    const query = queryString.parse(this.props.location.search);
    const pageSize = 10;
    const currentPage = query.page ? +query.page : 0;

    if (!count && !applications.loading) {
      return (
        <NoDataWrapper>
          <h2>No data</h2>
        </NoDataWrapper>
      );
    }

    return (
      <AdminApplicationsTable
        data={applications}
        loading={applications.loading}
        pageSize={pageSize}
        defaultCurrent={currentPage + 1}
        onEdit={this.editApplicationHandler}
        onDelete={this.deleteApplicationHandler}
        onChange={(props) => this.tableOnChange({pageSize, ...props})} />
    );
  };

  tableOnChange = (props = {}) => {
    const { loadApplications, location, push } = this.props;
    const { page, pageSize } = props;
    loadApplications({ page: page - 1, limit: pageSize });
    push(`${location.pathname}?page=${page - 1}`);
  };

  createApplicationHandler = (values) => {
    const { adminPanel, loadApplications, createApplication } = this.props;

    createApplication(values).then((response = {}) => {
      if (!response.error) {
        const filter = lodash.get(adminPanel, 'applications.filter', {});
        loadApplications(filter);
        toast.info(`Application "${response.name}" was created.`, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    });
  };

  editApplicationHandler = (props = {}) => {
    const { id, name } = props;
    const { adminPanel, loadApplications, editApplication } = this.props;

    editApplication(id, { name }).then((response = {}) => {
      if (!response.error) {
        const filter = lodash.get(adminPanel, 'applications.filter', {});
        loadApplications(filter);
        toast.info(`Application "${response.name}" was edited.`, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    });
  };

  deleteApplicationHandler = (props = {}) => {
    const { id, name } = props;
    const { adminPanel, loadApplications, deleteApplication } = this.props;

    deleteApplication(id).then((response = {}) => {
      if (!response.error) {
        const filter = lodash.get(adminPanel, 'applications.filter', {});
        loadApplications(filter);
        toast.info(`Application "${name}" was deleted.`, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    });
  };

  render() {
    const { adminPanel } = this.props;
    const createApplicationLoading = lodash.get(adminPanel, 'createApplication.loading', false);

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
          <Divider><h1>Applications List Management</h1></Divider>
          <CreateApplicationWrapper>
            <CreateApplicationButton onSubmit={this.createApplicationHandler} loading={createApplicationLoading} />
          </CreateApplicationWrapper>
          {this.getTableContent()}
        </Wrapper>
      </article>
    );
  }
}

function mapStateToProps(state = {}) {
  const { adminPanel } = state;
  return { adminPanel };
}

function mapDispatchToProps (dispatch) {
  return {
    push: bindActionCreators(push, dispatch),
    createApplication: bindActionCreators(adminPanelActions.createApplication, dispatch),
    editApplication: bindActionCreators(adminPanelActions.editApplication, dispatch),
    deleteApplication: bindActionCreators(adminPanelActions.deleteApplication, dispatch),
    loadApplications: bindActionCreators(adminPanelActions.loadApplications, dispatch),
    updateFilter: bindActionCreators(adminPanelActions.updateFilter, dispatch)
  };
}

const withReducer = injectReducer({ key: 'adminPanel', reducer });

export default compose(
  withReducer,
)(AdminPanelPage);
