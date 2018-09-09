import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Select, Icon } from 'antd';

import { data } from '../../redux/reducers/indexes';

import 'antd/lib/menu/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/pagination/style/index.css';
import 'antd/lib/table/style/index.css';
import 'antd/lib/select/style/index.css';
import '../style.css';
import 'antd/lib/style/index.css';

const TableContext = React.createContext();

const tableStyles = { 
  display: 'flex', 
  flexDirection: 'row',
  justifyContent: 'center'
};

const columns = [{
  title: '№ п/п',
  dataIndex: 'number',
  key: 'number',
  width: 80,
  sorter: (a, b) => a.number - b.number,
}, {
  title: 'КПЭ',
  dataIndex: 'kpe',
  key: 'kpe',
  width: 400,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.kpe.length - b.kpe.length,
}, {
  title: 'id',
  dataIndex: 'id',
  key: 'id',
  width: 80,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.id - b.id,
}, {
  title: 'Описание',
  dataIndex: 'desc',
  key: 'desc',
  width: 350,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.desc.lenght - b.desc.lenght,
}, {
  title: 'Ед.изм',
  dataIndex: 'ed',
  key: 'ed',
  width: 100,
  render: () => (
    <div>
      <Select defaultValue="%" style={{ width: 120 }}>
        <Option value="%">Вверх</Option>
        <Option value="Кол-во">Кол-во</Option>
        <Option value="Тыс.руб">Тыс.руб</Option>
        <Option value="Руб">Руб</Option>
      </Select>
    </div>  
  )
}, {
  title: 'Группа КПЭ',
  dataIndex: 'group',
  key: 'group',
  width: 150,
  render: () => (
    <div>
      <Select defaultValue="Общие" style={{ width: 120 }}>
        <Option value="Общие">Общие</Option>
        <Option value="Адресные">Адресные</Option>
        <Option value="Контрольные">Контрольные</Option>
      </Select>
    </div>  
  )
}, {
  title: 'Тип КПЭ',
  dataIndex: 'type',
  key: 'type',
  width: 150,
  render: () => (
    <div>
      <Select defaultValue="Ежемесячный" style={{ width: 120 }}>
        <Option value="Ежемесячный">Ежемесячный</Option>
        <Option value="Квартальный">Квартальный</Option>
      </Select>
    </div>  
  )
}, {
  title: 'Направление тренда',
  dataIndex: 'trend',
  key: 'trend',
  width: 150,
  render: () => (
    <div>
      <Select defaultValue="Вверх" style={{ width: 120 }}>
        <Option value="Вверх">Вверх</Option>
        <Option value="Вниз">Вниз</Option>
      </Select>
    </div>  
  )
}, {
  title: 'Формула расчета %',
  dataIndex: 'count',
  key: 'count',
  width: 150,
  render: () => (
    <div>
      <Select defaultValue="План/Факт" style={{ width: 120 }}>
        <Option value="План/Факт">План/Факт</Option>
        <Option value="Факт/План">Факт/План</Option>
      </Select>
    </div> 
  )
}, {
  title: 'Формула расчета K',
  dataIndex: 'k',
  key: 'k',
  width: 150,
  render: () => (
    <div>
      <span>k=Если</span><Select defaultValue="1" style={{ width: 120 }}>
        <Option value="1">1</Option>
        <Option value="2">2</Option>
      </Select>
    </div> 
  )
}, {
  title: 'Actions',
  dataIndex: 'actions',
  key: 'actions',
  width: 100,
  render: (text, record) => (
    <div>
      <TableContext.Consumer>
        {
          (context) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={ () => console.log(record) }>
                <Icon type="edit" />
              </Button>
              <Button type="danger" onClick={ () => console.log(record.id)}>
                <Icon type="close-circle" />
              </Button>
            </div>
          )
        }
      </TableContext.Consumer>
    </div>
  )
}];

class Indexes extends PureComponent{
  constructor(props){
    super(props);
    this.state ={
      tableStyles:{
        bordered: false,
        loading: false,
        pagination: true,
        size: 'default',
        // title: false,
        showHeader: true,
        rowSelection: {},
        scroll: undefined
      },
      data: [],
      isModalShown: false
    };
  }

  async componentDidMount(){
    // const { addData } = this.props.services;
    // const data = await loadEmplDataById(1);
    console.log(data);
    // addData(data);
  }

  componentDidUpdate(prevProps){
    if(this.props.data !== prevProps.data){
      this.setState({
        data: this.props.data
      });
    }
  }

  toggleModal = () => {
    this.setState(state => ({
      isModalShown: !state.isModalShown
    }));
    // if (!this.state.isModalShown){
    //   this.setState({
    //     selectedNode: null
    //   });
    // }
  }

  onChangeTable = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
  };

  render(){
    return(
        <div className="tablecont" style={ tableStyles }>
            <div style={{ dislay: 'flex', padding: 20+'px' }}>
              <Button className="editable-add-btn"                     
                      onClick={ () => {
                        this.setState({
                          currentEmployee: null
                        });
                        this.toggleModal(); } }>Add</Button>
              <TableContext.Provider value={{
                data: this.state.data
              }}>
                <Table {...this.state.tableStyles} columns={columns} dataSource={data} onChange={this.onChangeTable}/>
              </TableContext.Provider>          
            </div>
        </div>
    );
  }
}

Indexes.propTypes = {
  data: PropTypes.array,
  services: PropTypes.object
};

export default Indexes;