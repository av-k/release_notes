import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import lodash from 'lodash';
//
import { ROUTES } from '../../config/constants';


class MainMenu extends React.PureComponent {
  getCurrentKeyFromRouter = (props = {}) => {
    const { router = {} } = props;
    const pathname = lodash.get(router, 'location.pathname', '/');

    switch (pathname) {
      case ROUTES.HOME_PAGE:
        return 'home_page';
      case ROUTES.ADMIN_PANEL:
        return 'admin_panel';
      default:
        return null;
    }
  };

  getStyle = (props = {}) => {
    const { style } = props;
    const defaultStyle = {
      textAlign: 'center',
      position: 'relative',
      boxShadow: '0 0 5px 3px rgba(0,0,0, 0.25)'
    };

    return {...defaultStyle, ...style};
  };

  render() {
    const { style = {}, router } = this.props;
    const currentKey = this.getCurrentKeyFromRouter({ router });


    return (
      <Menu
        style={this.getStyle({ style })}
        onClick={this.handleClick}
        selectedKeys={[currentKey]}
        mode="horizontal" >
        <Menu.Item key="home_page">
          <Link to={ROUTES.HOME_PAGE}>
            <Icon type="table" />Applications
          </Link>
        </Menu.Item>
        <Menu.Item key="admin_panel">
          <Link to={ROUTES.ADMIN_PANEL}>
            <Icon type="tool" />Administration Panel
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default MainMenu;
