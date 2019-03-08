import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
//
import { Wrapper } from './index.styled';
import TopMenu from 'components/TopMenu';


@connect(mapStateToProps)
class App extends React.PureComponent {
  render() {
    const { router } = this.props;

    return (
      <Fragment>
        <TopMenu router={router} />
        <Wrapper id='app-wrapper'>
          {this.props.children}
        </Wrapper>
        <ToastContainer autoClose={4000} />
      </Fragment>
    );
  }
}

function mapStateToProps(store = {}) {
  const { router } = store;
  return { router };
}

export default App;
