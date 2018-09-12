import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Main from './Main';

import { isUserUnLogged } from '../lib/api';
import * as authActions from '../redux/actions/auth';
import * as menuActions from '../redux/actions/menu';
import '../components/style.css';

class App extends React.Component {
  state = {
    error: null,
    info: null
  };
  
  componentDidCatch(error, info){
    this.setState({
      error: error,
      info: info,
    });
  }

  renderApp = (user, menu, menuActions, authActions) => (
    <div className="main">
      <Header user={ user } menu={ menu } logout={ authActions.logout }/>
      <hr/>
      <div className="container">
        <SideMenu menu={ menu } changeMenu={menuActions.changeMenu} />
        <Main />
      </div>
    </div>
  );

  render(){
    const { user, menu, menuActions, authActions } = this.props;
    if(this.state.error) {
      // Some error was thrown. Let's display something helpful to the user
      return (
        <div>
          <h3>Произошла ошибка!</h3>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return (
      <div>
        { isUserUnLogged() && <Redirect to="/login" /> }
        {this.renderApp(user, menu, menuActions, authActions)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  menu: state.menu.item,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  menuActions: bindActionCreators(menuActions, dispatch)
});

App.propTypes = {
  user: PropTypes.object,
  menu: PropTypes.string,
  authActions: PropTypes.object.isRequired,
  menuActions: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);