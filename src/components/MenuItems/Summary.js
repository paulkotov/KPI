import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { Table, Menu } from 'antd';
import SortableTree from 'react-sortable-tree';

import { data } from '../../redux/reducers/structure';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/pagination/style/index.css';
import 'antd/lib/table/style/index.css';
import '../style.css';
import 'antd/lib/style/index.css';
import 'react-sortable-tree/style.css';

const tableStyles = { 
  display: 'flex', 
  flexDirection: 'row',
  justifyContent: 'center',
  position: 'absolute',
  left:200+'px'
};

const columns = [{
  title: '№',
  dataIndex: 'id',
  key: 'id',
  width: 80,
  sorter: (a, b) => a.id - b.id,
},{
  title: 'Показатель',
  dataIndex: 'indx',
  key: 'indx',
  width: 400,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.indx - b.indx,

}, {
  title: 'План',
  dataIndex: 'plan',
  key: 'plan',
  width: 250,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.plan - b.plan,
}, {
  title: 'Факт',
  dataIndex: 'fact',
  key: 'fact',
  width: 250,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.fact - b.fact,
}, {
  title: 'K',
  dataIndex: 'k',
  key: 'k',
  width: 250,
  defaultSortOrder: 'descens',
  sorter: (a, b) => a.k - b.k,
}, {
  title: 'Оценка выполнения',
  dataIndex: 'mark',
  key: 'mark',
  width: 250,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.mark - b.mark
}, {
  title: 'Итоговый %',
  dataIndex: 'sum',
  key: 'sum',
  width: 250,
  render: () => (
    <p>
    88,5%* (1-70%)  
    </p>
  )
}];

const dataSource = [{
  key: '1',
  id: 1,
  indx: 'Дочерняя организация',
  plan: 100,
  fact: 80,
  k: 100,
  mark: '100',

}, {
  key: '2',
  id: 2,
  indx: 'Дочерняя организация',
  plan: 100,
  fact: 80,
  k: 100,
  mark: '100',
}, {
  key: '3',
  id: 3,
  indx: 'Дочерняя организация',
  plan: 100,
  fact: 80,
  k: 100,
  mark: '100',
}, {
  key: '4',
  id: 4,
  indx: 'Дочерняя организация',
  plan: 100,
  fact: 80,
  k: 100,
  mark: '100',
}];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

class Summary extends PureComponent {
  state = {
    current: 'year',
    table:{
      bordered: false,
      loading: false,
      pagination: true,
      size: 'default',
      // title: false,
      showHeader: true,
      rowSelection: {},
      scroll: undefined
    },
    treeData: data
  };

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render(){
    // const getNodeKey = ({ treeIndex }) => treeIndex;

    return (
      <div className="container">
        <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal">
          <Menu.Item key="year">По году</Menu.Item>
          <Menu.Item key="kv">По кварталу</Menu.Item>
          <Menu.Item key="month">По месяцу</Menu.Item>
        </Menu>
        <div classtitle="tablecont" style={tableStyles}>
          <div style={{ height: 500+'px', width: 700+'px', overflow: 'auto' }}>
            <SortableTree
              treeData={this.state.treeData}
              onChange={() => console.log('Done')}
              generateNodeProps={({ node }) => ({
                title: (
                  <span>{node.id}{' '}{node.name}</span>
                )
              })
            }
            />
          </div>
          <div style={{ overflow: 'auto' }}>
              <Table {...this.state.table} columns={columns} dataSource={dataSource} onChange={onChange} scroll={{ x: 1000 }}/>
          </div>
        </div>
      </div>
    );
  }
}
  
Summary.propTypes = {
  
};

export default Summary;