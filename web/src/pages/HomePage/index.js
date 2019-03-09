import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { push } from 'connected-react-router'
import lodash from 'lodash';
import { toast } from 'react-toastify';
import queryString from 'query-string';
//
import reducer from './reducer';
import * as homeActions from './actions';
import injectReducer from 'utils/injectReducer';
import { Wrapper, NoDataWrapper } from './index.styled';
import PublicApplicationsTable from 'components/PublicApplicationsTable';


@connect(mapStateToProps, mapDispatchToProps)
class HomePage extends React.PureComponent {
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
    const currentApps = lodash.get(this, 'props.home.applications', {});

    if (currentApps.error && !this.errorsIds.includes(currentApps.error.id)) {
      this.errorsIds.push(currentApps.error.id);
      toast.error(currentApps.error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  getTableContent = () => {
    const { applications } = this.props.home;
    const count = lodash.get(applications, 'meta.count', 0);
    const query = queryString.parse(location.search);
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
      <PublicApplicationsTable
        data={applications}
        loading={applications.loading}
        pageSize={pageSize}
        defaultCurrent={currentPage + 1}
        onChange={(props) => this.appsTableOnChange({pageSize, ...props})} />
    );
  };

  appsTableOnChange = (props = {}) => {
    const { loadApplications, push } = this.props;
    const { page, pageSize } = props;
    loadApplications({ page: page - 1, limit: pageSize });
    push(`${location.pathname}?page=${page - 1}`);
  };

  render() {
    return (
      <article>
        <Helmet>
          <title>Applications List</title>
          <meta
            name="description"
            content="Applications List"
          />
        </Helmet>
        <Wrapper>
          {this.getTableContent()}
        </Wrapper>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  onSubmitForm: PropTypes.func
};

function mapStateToProps(state = {}) {
  const { home } = state;
  return { home };
}

function mapDispatchToProps (dispatch) {
  return {
    push: bindActionCreators(push, dispatch),
    loadApplications: bindActionCreators(homeActions.loadApplications, dispatch),
    updateFilter: bindActionCreators(homeActions.updateFilter, dispatch)
  };
}

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
)(HomePage);
