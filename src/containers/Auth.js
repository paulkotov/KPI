import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Login from '../components/Login';
// import { isUserUnLogged } from '../lib/api';

import * as authActions from '../redux/actions/auth';
import Redirect from 'react-router-dom/Redirect';

class Auth extends React.Component {

  render(){
    const { user, authActions } = this.props;
    return(
      <div>
        { user === null ? <Login user={user} login={ authActions.login }/> : <Redirect to="/" /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch)
});

Auth.propTypes = {
  user: PropTypes.object,
  authActions: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);