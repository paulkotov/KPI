import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Structure from './MenuItems/Structure';
import Users from './MenuItems/Users';
import Employees from './MenuItems/Employees';
import Indexes from './MenuItems/Indexes';
import Plan from './MenuItems/Plan';
import Fact from './MenuItems/Fact';
import Summary from './MenuItems/Summary';
import Settings from './MenuItems/Settings';

class MainComp extends Component{
  constructor(props){
    super(props);
    this.state = {
      menu: props.menu
    };
  }

  renderMenu = () => {
    const { 
      users,
      structure,
      employees,
      indexes,
      plan,
      fact,
      usersActions,
      structureActions,
      employeesActions,
      indexesActions,
      planActions,
      factActions,
      menu
     } = this.props;
    switch (menu){
      case "1": 
      default :
        return <Users data={ users } services={ usersActions }/>;
      case "2":
        return <Structure data={ structure } services={ structureActions }/>;
      case "3":  
        return <Employees data={ employees }  services={ employeesActions }/>;
      case "4":  
        return <Indexes data={ indexes } services={ indexesActions }/>;
      case "5":  
        return <Plan data={ plan } services={ planActions }/>;
      case "6":  
        return <Fact data={ fact } services={ factActions }/>;
      case "7":
        return <Summary data={ structure } />;
      case "8":
        return <Settings />;   
    }
  };
 
  render(){
    return(
      <div style={{ width: 100+'%' }}>
        { this.renderMenu() }
      </div>
    );
  }

}

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

export default MainComp;