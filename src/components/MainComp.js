import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// import Structure from './MenuItems/Structure';
// import Spinner from '../components/Shared/Spinner';
import Employees from './MenuItems/Employees';
import Indexes from './MenuItems/Indexes';
import Plan from './MenuItems/Plan';
import Fact from './MenuItems/Fact';
import Summary from './MenuItems/Summary';
import Settings from './MenuItems/Settings';
import Loadable from 'react-loadable';

import './style.css';

const UserComp = Loadable({
  loader: () => import('./MenuItems/Users'),
  loading: () => null,
  render: (loaded, props) => {
    let Comp = loaded.default;
    return <Comp {...props} />;
  }
});

const StructComp = Loadable({
  loader: () => import('./MenuItems/Structure'),
  loading: () => null,
  render: (loaded, props) => {
    let Comp = loaded.default;
    return <Comp {...props} />;
  }
});

class MainComp extends PureComponent{
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
      case '1': 
      default :
        return <UserComp data={ users } services={ usersActions }/>;
      case '2':
        return <StructComp data={ structure } services={ structureActions }/>;
      case '3':  
        return <Employees data={ employees }  services={ employeesActions }/>;
      case '4':  
        return <Indexes data={ indexes } services={ indexesActions }/>;
      case '5':  
        return <Plan data={ plan } services={ planActions }/>;
      case '6':  
        return <Fact data={ fact } services={ factActions }/>;
      case '7':
        return <Summary data={ structure } />;
      case '8':
        return <Settings />;   
    }
  };
 
  render(){
    return(
      <div className="component">
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