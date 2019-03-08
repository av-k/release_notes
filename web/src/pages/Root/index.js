import React from 'react';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import PT from 'prop-types';
//
import { routes } from '../../routes';
import ErrorBoundary from '../../components/ErrorBoundary';
import MainWrapper from '../../components/MainWrapper';


function Root({ store }) {
  return (
    <Provider store={store}>
      <MainWrapper params={{id: 'root-wrapper'}}>
        <Helmet itleTemplate="%s - Release Notes"
                defaultTitle="Release Notes">
          <meta name="description" content="Sample Application" />
        </Helmet>
        <ErrorBoundary>
          {routes}
        </ErrorBoundary>
      </MainWrapper>
    </Provider>
  );
}

Root.propTypes = {
  store: PT.objectOf(PT.oneOfType([PT.func, PT.object])).isRequired,
};

export default Root;
