import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../redux/actions/users';
import * as structureActions from '../redux/actions/structure';
import * as employeesActions from '../redux/actions/employees';
import * as indexesActions from '../redux/actions/indexes';
import * as planActions from '../redux/actions/plan';
import * as factActions from '../redux/actions/fact';

import MainComp from '../components/MainComp';

const mapStateToProps = state => ({
  auth: state.auth.user,
  menu: state.menu.item,
  users: state.users.data,
  structure: state.structure.data,
  employees: state.employees.data,
  indexes: state.indexes.data,
  plan: state.plan.data,
  fact: state.fact.data,
});

const mapDispatchToProps = dispatch => ({
  usersActions: bindActionCreators(userActions, dispatch),
  structureActions: bindActionCreators(structureActions, dispatch),
  employeesActions: bindActionCreators(employeesActions, dispatch),
  indexesActions: bindActionCreators(indexesActions, dispatch),
  planActions: bindActionCreators(planActions, dispatch),
  factActions: bindActionCreators(factActions, dispatch),
});

MainComp.propTypes = {
  users: PropTypes.array,
  structure: PropTypes.array,
  employees: PropTypes.array,
  indexes: PropTypes.array,
  plan: PropTypes.array,
  fact: PropTypes.array,
  menu: PropTypes.string,
  usersActions: PropTypes.object,
  structureActions: PropTypes.object,
  employeesActions: PropTypes.object,
  indexesActions: PropTypes.object,
  planActions: PropTypes.object,
  factActions: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainComp);