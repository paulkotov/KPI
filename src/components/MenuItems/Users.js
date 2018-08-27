import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Redirect } from 'react-router-dom';

import { Table, Icon, Button, Popconfirm } from 'antd';
import SearchPanel from '../Shared/SearchPanel';
import EditorPanel from '../Shared/EditorPanel';
import FileLoadModal from '../Modals/UploadFileModal';
import UserModal from '../Modals/UserModal';
// import { Spinner } from './Spinner';

//services
import { loadDataFile, checkIfNull } from '../../lib/api';
import { loadUsers, getUserInfo, addUser } from '../../lib/services/users';
import { loadStructData } from '../../lib/services/structure';
import { setRules } from '../../lib/rules';
// import { data } from '../redux/reducers/users';

//styles
import 'antd/lib/menu/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/pagination/style/index.css';
import 'antd/lib/table/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/style/index.css';
import 'antd/dist/antd.css';
import './editablecell.css';
import '../style.css';

// const FormItem = Form.Item;
// const expandedRowRender = record => <p>{record.description}</p>;
// const title = () => 'Here is title';
const showHeader = true;
// const scroll = { y: 240 };
// const pagination = { position: 'bottom' };

const TableCont = styled.div` 
  display: 'flex', 
  flexDirection: 'row',
  justifyContent: 'center'
`;

const newUser = {
  login: '',
  password: '',
  role: '',
  id: '',
  name: '',
  otch: '',
  surname: '',
  org: '',
  dept: '',
  pos: ''
};

class Users extends PureComponent{
  state = {
    data: {
      initial: [],
      savedData: [],
      newData: [],
      selectedRows: [],
      depts: []
    },
    tableStyles: {
      bordered: false,
      loading: false,
      pagination: {},
      size: 'default',
      showHeader,
      rowSelection: {},
      sorter: null
    },
    filter: {
      fio: '',
      dept: ''
    },
    currentUser: null,
    count: 0,
    isUploadModalShown: false,
    isAddModalShown: false,
  };
  
  columns = [{
    title: '№',
    dataIndex: 'id',
    key: 'id',
    width: 200
  }, {
    title: 'Логин',
    dataIndex: 'login',
    key: 'login',
    width: 500
  }, {
    title: 'Пароль',
    dataIndex: 'password',
    key: 'password',
    width: 600
  }, {
    title: 'Роль',
    dataIndex: 'role',
    key: 'role',
    width: 600
  }, {
    title: 'Организация',
    dataIndex: 'org',
    key: 'org',
    width: 600
  }, {
    title: 'ФИО',
    dataIndex: 'name',
    key: 'name',
    width: 600
  }, {
    title: 'Подразделение',
    dataIndex: 'dept',
    key: 'dept',
    width: 600
  }, {
    title: 'Должность',
    dataIndex: 'pos',
    key: 'pos',
    width: 600,
  }, {
    title: 'Контакты',
    dataIndex: 'contacts',
    key: 'contacts',
    width: 600
  }, {
    title: 'Права',
    dataIndex: 'rules',
    key: 'rules',
    width: 400
  }, {
    title: 'Действия',
    dataIndex: 'actions',
    key: 'actions',
    width: 400,
    render: (text, record) => {
      return (
        <div>
          <Button size="small" onClick={ () => {
            this.setState({ currentUser: record });
            this.toggleAddModal();
          }}
          >
            <Icon type="edit" />
          </Button>
          { record.id !==1 ?
          (
            <Popconfirm title="Удалить?" onConfirm={() => this.onDelete(record.key)}>
              <Button type="danger" size="small"><Icon type="close-circle" /></Button>
            </Popconfirm>
          ) : null}

        </div>
      );
    },
  }];

  async componentDidMount(){
    const { addData } = this.props.services;
    const { data } = this.props;
    let users;
    let depts;

    this.setState({ count: this.state.data.savedData.length });
    try {
      users = await loadUsers();
      depts = await loadStructData();
    } catch(e) {
      console.log(e);
    }
    // console.log(users);
    if (!!users) {
      addData(users);
      this.setState({
        data: {
          ...this.state.data,
          initial: data,
          savedData: data.map( (item, index) => { 
            if (item.comment !== null){
              const comments = getUserInfo(item.comment);
              return {
                ...item, 
                name: checkIfNull(comments[0])+' '+checkIfNull(comments[1])+' '+checkIfNull(comments[2]),
                dept: checkIfNull(comments[3]),
                pos: checkIfNull(comments[4]),
                contacts: checkIfNull(comments[5])+' '+checkIfNull(comments[6]),
                key: ++index
              }; 
            } else return { 
              ...item,               
              key: ++index 
            };
          })
        }
      });
    }
    if (!!depts){
      this.setState({
        count: data.length
      });
      this.setState({
        data: {
          ...this.state.data,
          depts: setRules(depts)
        }
      });
    }  
  }
  
  componentDidUpdate(prevProps){
    if(this.props.data !== prevProps.data){
      this.setState({
        data: { 
          ...this.state.data,
          savedData: this.props.data 
        }
      });
    }
  }

  toggleUploadModal = () => {
    this.setState({
      isUploadModalShown: !this.state.isUploadModalShown
    });
  }

  toggleAddModal = () => {
    this.setState({
      isAddModalShown: !this.state.isAddModalShown
    });
  }

  // onCellChange = (key, dataIndex) => {
  //   return (value) => {
  //     const dataSource = [...this.state.dataSource];
  //     const target = dataSource.find(item => item.key === key);
  //     if (target) {
  //       target[dataIndex] = value;
  //       this.setState({ dataSource });
  //     }
  //   };
  // }

  onDelete = key => {
    const data= [...this.state.data.savedData];
    this.setState({ data: { savedData: data.filter(item => item.key !== key) } });
  }

  handleAdd = user => {
    const { count } = this.state;
    const { savedData } = this.state.data;
    const contacts = getUserInfo(user.comment);
    const newUser = {
      key: count+1,
      id: user.worker_id,
      login: user.login,
      password: user.password,
      name: contacts[0]+' '+contacts[1]+' '+contacts[2],
      org: 'Org',
      dept: contacts[3],
      pos: contacts[4],
      contacts: contacts[5]+' '+contacts[6],
      role: user.role
    };
    this.setState({
      data: { 
        ...this.state.data,
        savedData: [...savedData, newUser] 
      },
      count: count + 1,
    });
  }

  // handleAdd = () => {

  //   return(
  //     <div>

  //     </div>
  //   );
  // }
  // newUser = user => {
  //   const { dataSource } = this.state;
  //   console.log(user);
  //   let newUser = {
  //     name: user.name,
  //     otch: user.otch,
  //     surname: user.otch,
  //     dep: user.dep,
  //     password: user.password,
  //     login: user.login,
  //   };

  //   this.setState({ dataSource: [...dataSource, newUser] });
  // }
  handleSave = () => {
    let users = this.state.data.selectedRows;
    users.map( async item => {
      let user = {};
      user.login = item.login;
      user.password = item.password;
      user.role = item.role;
      user.rules = 'all';
      users.worked_id = item.id;
      user.comment = checkIfNull(item.name)+' '+checkIfNull(item.dept)+' '+checkIfNull(item.pos)+' '+checkIfNull(item.contacts);
      const response = await addUser(user);
      console.log(response);
    });
  }

  handleUndo = () => {
    this.setState({
      data: { 
        ...this.state.data,
        savedData: this.state.data.initial 
      },
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    // console.log('params', pagination, filters, sorter);
    const pager = { ...this.state.tableStyles.pagination };
    pager.current = pagination.current;
    this.setState({
      tableStyles: { ...this.state.tableStyles, pagination: pager, sorter: sorter }

    });

  }

  render(){
    const { tableStyles, isUploadModalShown, isAddModalShown, currentUser, data } = this.state;
    const { savedData, selectedRows } = data;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({
          data: {
            ...this.state.data, 
            selectedRows: selectedRows
          }
        });
        // this.handleSave(selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return(
      <div>
        {isUploadModalShown && 
          <FileLoadModal isUploadModalShown={isUploadModalShown} 
            toggleUploadModal={this.toggleUploadModal} 
            fileHandler={loadDataFile}
          /> 
        }
        {
          isAddModalShown &&
          <UserModal isAddModalShown={isAddModalShown}
            toggleAddModal={this.toggleAddModal}
            dataHandler={this.handleAdd}
            data={currentUser === null ? newUser : currentUser }
            rules={this.state.data.depts}                
          />
        }
        <TableCont className="tablecont">
          <div style={{ dislay: 'flex', padding: 20+'px' }}>
            <SearchPanel handler={null}/>
            <EditorPanel enableSave={ selectedRows.length !== 0 }
                          enableUndo={ savedData.length !== this.state.data.initial.length }
                          saveChanges={this.handleSave} 
                          undoChanges={this.handleUndo}
            />   
            { /* <Button className="editable-add-btn" type="primary"><a href="/reg">Добавить пользователя</a></Button> */} 
            <Button className="editable-add-btn" 
                    onClick={ () => {
                      this.setState({
                        currentUser: null
                      });
                      this.toggleAddModal(); } }
            >Добавить пользователя</Button> 
            <div style={{ width: 1950+'px', overflow: 'auto' }}>
              <Table 
                    {...tableStyles} 
                    columns={this.columns} 
                    dataSource={savedData} 
                    onChange={this.handleTableChange}
                    rowSelection={rowSelection}
              />
            </div> 
            <div className="footer"
                 style={{ position: 'absolute', bottom: 0+'px', display: 'flex', justifyContent: 'flex-start', backgroundColor: '#FCFCFC' }}>
              <div style={{ padding: 10+'px' }}>
                <Button type="primary" onClick={ () => this.toggleUploadModal() }>Upload <Icon type="upload" /></Button>
              </div>
              <div style={{ padding: 10+'px' }}>
                <Button type="default">Download <Icon type="download" /></Button>
              </div>
            </div>
          </div>
        </TableCont>
      </div>
    );
  }
}

Users.propTypes = {
  data: PropTypes.array,
  services: PropTypes.object
};

export default Users;