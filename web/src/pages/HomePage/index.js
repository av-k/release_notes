import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import injectReducer from '../../utils/injectReducer';
import Section from './Section';
import reducer from './reducer';


@connect(mapStateToProps, mapDispatchToProps)
class HomePage extends React.PureComponent {
  render() {
    return (
      <article>
        <Helmet>
          <title>Release Notes</title>
          <meta
            name="description"
            content="Applications release notes"
          />
        </Helmet>
        <div>
          <Section>
            <h1>Home Page</h1>
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  onSubmitForm: PropTypes.func
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return {};
}

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
)(HomePage);
