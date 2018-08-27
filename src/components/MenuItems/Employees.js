import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Table, Icon, DatePicker, Modal, Button } from 'antd';

import SearchPanel from '../Shared/SearchPanel';
import EditorPanel from '../Shared/EditorPanel';
import EmplModal from '../Modals/EmplModal';
import { data } from '../../redux/reducers/employees';
import { loadEmplDataById } from '../../lib/services/employees';

import 'antd/lib/menu/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/pagination/style/index.css';
import 'antd/lib/table/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import '../style.css';
import 'antd/lib/style/index.css';

const dateFormat = 'DD/MM/YYYY';

const tableStyles = { 
  display: 'flex', 
  flexDirection: 'row',
  justifyContent: 'center'
};

const TableContext = React.createContext();

const newEmployee = {
  id: 0, 
  dir: '', 
  pos: '', 
  empl: '', 
  t_id: 0, 
  date1: '01/01/2010', 
  date2: '01/01/2010', 
  date3: '01/01/2010', 
  param1: '', 
  text: ''
};

export class DateModal extends Component {
  state = {
    dateFormat : 'DD/MM/YYYY',
    editable: false
  }
  static propTypes = {
    onChange: PropTypes.func,
    text: PropTypes.string
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }

  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  edit = () => {
    this.setState({ editable: true });
  }

  render(){
    const { text } = this.props;
    return (
      <Modal>
        <DatePicker defaultValue={moment(text, dateFormat)} format={dateFormat} />
      </Modal>
    );
  }
}

// const onChangeDate = (recId, newDate, oldDate) => {
//   console.log('ID: '+recId);
//   console.log('old date: '+oldDate);
//   console.log('new date: '+newDate);
// };

const columns = [{
  title: '№',
  dataIndex: 'id',
  key: 'id',
  width: 80,
  sorter: (a, b) => a.id - b.id,
}, {
  title: 'Подразделение',
  dataIndex: 'dir',
  key: 'dir',
  width: 400,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.dir.length - b.dir.length,
}, {
  title: 'Должность',
  dataIndex: 'pos',
  key: 'pos',
  width: 250,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.pos.lenght - b.pos.lenght
}, {
  title: 'Сотрудник',
  dataIndex: 'empl',
  key: 'empl',
  width: 120,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.empl.length - b.empl.lenght,
}, {
  title: 'Табл №',
  dataIndex: 't_id',
  key: 't_id',
  width: 120,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.t_id - b.t_id,
}, {
  title: 'Дата приема',
  dataIndex: 'date1',
  key: 'date1',
  width: 200
}, {
  title: 'Дата увольнения',
  dataIndex: 'date2',
  key: 'date2',
  width: 200
}, {
  title: 'Дата перевода',
  dataIndex: 'date3',
  key: 'date3',
  width: 200
}, {
  title: 'Парам1',
  dataIndex: 'param1',
  key: 'param1',
  width: 100,
}, {
  title: 'Sometext',
  dataIndex: 'text',
  key: 'text',
  width: 100,
}, {
  title: 'Actions',
  dataIndex: 'actions',
  key: 'actions',
  width: 100,
  render: (text, record) => (
    <div>
      <TableContext.Consumer>
        {
          () => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={ () => console.log(record) }>
                <Icon type="edit" />
              </Button>
              <Button onClick={ () => console.log(record.id)}>
                <Icon type="close-circle" />
              </Button>
            </div>
          )
        }
      </TableContext.Consumer>
    </div>
  )
}];

// function onChange(pagination, filters, sorter) {
//   console.log('params', pagination, filters, sorter);
// }

class Employees extends Component {
  state = {
    tableSettings: {
      bordered: false,
      loading: false,
      pagination: true,
      size: 'default',
      // title: false,
      showHeader: true,
      rowSelection: {},
      scroll: undefined
    },
    currentEmployee: null,
    initialData: [],
    data: [],
    dates: {
      date1: '01/01/2012',
      date2: '01/08/2000',
      date3: '15/03/2010',
    },
    selectedRows: [],
    isModalShown: false,
  };

  async componentDidMount(){
    // const { addData } = this.props.services;
    const data = await loadEmplDataById(1);
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
    this.setState({
      isModalShown: !this.state.isModalShown
    });
    // if (!this.state.isModalShown){
    //   this.setState({
    //     selectedNode: null
    //   });
    // }
  }

  onChangeTable = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
  };

  handleAdd = employee => {
    console.log(employee);
  };

  handleSave = () => {

  };

  render(){
    const { isModalShown, currentEmployee, selectedRows } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, rows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selectedRows: rows });
        // this.handleSave(selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div className="tablecont" style={tableStyles}>
        <div style={{ dislay: 'flex', padding: 20+'px' }}>
          {
            isModalShown &&
            <EmplModal isModalShown={isModalShown}
              toggleAddModal={this.toggleModal}
              dataHandler={this.handleAdd}
              data={currentEmployee === null ? newEmployee : currentEmployee }           
            />
          }
          <SearchPanel />
          <EditorPanel enableSave={ selectedRows.length !== 0 }
                          enableUndo={ data.length !== this.state.initialData.length }
                          saveChanges={this.handleSave} 
                          undoChanges={this.handleUndo}
            />  
          <TableContext.Provider value={{
            data: this.state.dates,
            edit: (record) => {
              this.setState((prevState) => { 
                return { 
                  currentEmployee: record, 
                  isModalShown: !prevState.isModalShown 
                };
              });
            },
            delete: (id) => {
              console.log(id);
            }
            // updateDate: (date) => this.setState({ data: {} })
          }}>
            <Button className="editable-add-btn" 
                    onClick={ () => {
                      this.setState({
                        currentEmployee: null
                      });
                      this.toggleAddModal(); } }
            >Добавить сотрудника</Button> 
            <Table {...this.state.tableSettings} columns={columns} 
                                                  dataSource={data} 
                                                  onChange={ this.onChangeTable }
                                                  rowClassName={() => 'editable-row'}
                                                  rowSelection={rowSelection}
            />
          </TableContext.Provider>
        </div>
      </div>
    );
  }
}

Employees.propTypes = {
  data: PropTypes.array,
  services: PropTypes.object
};

export default Employees;