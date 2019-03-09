import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import lodash from 'lodash';
import { toast } from 'react-toastify';
//
import reducer from './reducer';
import * as applicationActions from './actions';
import injectReducer from '../../utils/injectReducer';
import { Wrapper, NoDataWrapper } from './index.styled';
import PublicApplicationsTable from 'components/PublicApplicationsTable';


@connect(mapStateToProps, mapDispatchToProps)
class PublicNotesPage extends React.PureComponent {
  applicationId = null;
  errorsIds = [];

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.errorsHandler({ prevProps, prevState, snapshot });
  }

  componentDidMount() {
    this.applicationId = lodash.get(this, 'props.match.params.id', null);
    const { loadApplication } = this.props;
    loadApplication(this.applicationId);
  }

  errorsHandler = () => {
    const currentApps = lodash.get(this, 'props.application.applications', {});

    if (currentApps.error && !this.errorsIds.includes(currentApps.error.id)) {
      this.errorsIds.push(currentApps.error.id);
      toast.error(currentApps.error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  getContent = () => {
    const { applications } = this.props.application;
    const count = lodash.get(applications, 'meta.count', 0);
    const pageSize = 10;

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
          <title>Application</title>
          <meta
            name="description"
            content="Application Release Notes"
          />
        </Helmet>
        <Wrapper>
          {/*{this.getContent()}*/}
        </Wrapper>
      </article>
    );
  }
}

function mapStateToProps(state = {}) {
  const { application } = state;
  return { application };
}

function mapDispatchToProps (dispatch) {
  return {
    loadApplication: bindActionCreators(applicationActions.loadApplication, dispatch),
  };
}

const withReducer = injectReducer({ key: 'application', reducer });

export default compose(
  withReducer,
)(PublicNotesPage);
