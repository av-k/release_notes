import React from 'react';
import { Wrapper } from './index.styled';
import PT from 'prop-types';

const MainWrapper = props => (
  <Wrapper {...props.params}>{props.children}</Wrapper>
);

MainWrapper.propTypes = {
  children: PT.oneOfType([
    PT.element,
    PT.array
  ])
};

export default MainWrapper;
