import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import lodash from 'lodash';
import { toast } from 'react-toastify';
//
import reducer from './reducer';
import * as homeActions from './actions';
import injectReducer from '../../utils/injectReducer';
import { Wrapper, NoDataWrapper } from './index.styled';
import ApplicationsTable from 'components/ApplicationsTable';


@connect(mapStateToProps, mapDispatchToProps)
class HomePage extends React.PureComponent {
  errorsIds = [];

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.errorsHandler({ prevProps, prevState, snapshot });
  }

  componentDidMount() {
    const { loadApplications } = this.props;
    loadApplications();
  }

  errorsHandler = () => {
    const currentApps = lodash.get(this, 'props.home.applications', {});

    if (currentApps.error && !this.errorsIds.includes(currentApps.error.id)) {
      this.errorsIds.push(currentApps.error.id);
      toast.error(currentApps.error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  getContent = () => {
    const { applications } = this.props.home;
    const count = lodash.get(applications, 'meta.count', 0);
    const pageSize = 10;

    if (!count) {
      return (
        <NoDataWrapper>
          <h2>No data</h2>
        </NoDataWrapper>
      );
    }

    return (
      <ApplicationsTable data={applications}
                         loading={applications.loading}
                         pageSize={pageSize}
                         onChange={(props) => this.appsTableOnChange({pageSize, ...props})} />
    );
  };

  appsTableOnChange = (props = {}) => {
    const { loadApplications } = this.props;
    const { page, pageSize } = props;
    loadApplications({ page: page - 1, limit: pageSize });
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
          {this.getContent()}
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
    loadApplications: bindActionCreators(homeActions.loadApplications, dispatch),
  };
}

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
)(HomePage);
