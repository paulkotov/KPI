import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Menu } from 'antd';

import 'antd/lib/menu/style/index.css';

// const MenuItemGroup = Menu.ItemGroup;

const items = ['Пользователи', 'Структура', 'Сотрудники', 'Показатели', 'План', 'Факт', 'Итог', 'Настройки'];

class SideMenu extends Component {
  state = {
    current: this.props.menu,
  }

  handleClick = (item) => {
    const { changeMenu } = this.props;
    this.setState({
      current: item.key
    });
    changeMenu(item.key);
  };

  render(){
    return(
      <div style={{ width: 150+'px' }}>
            <Menu onSelect={this.handleClick} selectedKeys={[this.state.current]}>
              {
                items.map( (item, idx) => (
                  <Menu.Item key={++idx}><b>{item}</b></Menu.Item>
                ))
              }
            </Menu>
      </div>
    );
  }
}

SideMenu.propTypes = {
  menu: PropTypes.string,
  changeMenu: PropTypes.func
};

export default SideMenu;