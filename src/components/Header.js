import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

import 'antd/lib/menu/style/index.css';
import 'antd/lib/button/style/index.css';
import './style.css';
import 'antd/lib/style/index.css';
import Redirect from 'react-router-dom/Redirect';

const nameHeader = menu => {
  switch (menu){
    case "1":
      return 'Пользователи';
    case "2":
      return 'Структура';
    case "3":  
      return 'Сотрудники';
    case "4":  
      return 'Показатели';
    case "5":  
      return 'План';
    case "6":  
      return 'Факт';
    case "7":
      return 'Итог';  
    default:
      return 'Пользователи';
  }
};

const headerStyles = { 
  display: 'flex', 
  flexDirection: 'row', 
  flexWrap: 'wrap', 
  justifyContent: 'space-between',
  alignContent:'flex-start', 
  boxSizing: 'border-box', 
  backgroundColor: '#FCFCFC'
};

// const  logoStyles = {
//   display: 'float', 
//   position: 'relative', 
//   left: 150+'px'
// };

const Logo = ({ menu }) => (
  <span className='logo' style={{ display: 'flex' }}>
    {/* <div><a href='/' className='logo-link'><img src="" alt=''/></a></div> */}
    <div className='logo-title'>
      <h2>{ nameHeader(menu) }</h2>
    </div>
  </span>
);

class Header extends Component{
  constructor() {
    super();
    this.state = {
      user: ''
    };
    // this.setState({ user: this.props.user });
  }

  handleLogout = () => {
    const { logout } = this.props;
    window.localStorage.removeItem('user');
    logout();
  }
// check type of user to pass into App
  render(){
    const { menu, user } = this.props;
    return (
      <div>
        { !user && <Redirect to="/login" /> }
        { user &&
        <div className='header' style={headerStyles}>
          <Logo menu={ menu }/>
          <div className="user" style={{ display: 'flex' }}>

            <div className="user-info" style={{ padding: 10+'px' }}>
              Logged as: 
              <div><b>{user.login}</b></div>
            </div>
            <Button type="primary" onClick={this.handleLogout}><b>Выйти </b><Icon type="logout" size="big"/></Button>

          </div>
        </div>
      }
    </div>
    );
  }
}

Logo.propTypes = {
  menu: PropTypes.string,
};

Header.propTypes = {
  menu: PropTypes.string,
  user: PropTypes.object,
  logout: PropTypes.func
};

export default Header;
