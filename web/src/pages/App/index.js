import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PT from 'prop-types';
//
import { Wrapper } from './index.styled';
import TopMenu from 'components/TopMenu';


@connect(mapStateToProps, mapDispatchToProps)
class App extends React.PureComponent {
  render() {
    const { router } = this.props;

    return (
      <Wrapper>
        <TopMenu style={{'textAlign': 'center'}} router={router} />
        {this.props.children}
        {/* Here could be header / footer / static blocks and etc */}
      </Wrapper>
    );
  }
}

function mapStateToProps(store = {}) {
  const { router } = store;
  return { router };
}

function mapDispatchToProps(dispatch) {
  return {
    // loadCities: bindActionCreators(arraySetsActions.getCities, dispatch),
  };
}

App.propTypes = {
  children: PT.element.isRequired
};

export default App;
