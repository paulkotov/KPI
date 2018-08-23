import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Col, Select } from 'antd';

// import { getUser } from '../lib/api';
const FormItem = Form.Item;
const Option = Select.Option;

// import { addUser } from '../services/users';

import 'antd/lib/form/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/card/style/index.css';
import 'antd/lib/select/style/index.css';
import './style.css';
import 'antd/lib/style/index.css';

import './users.css';

// const roles = [
//   {
//     value: 'Superadmin',
//     label: 'Superadmin' 
//   },{
//     value: 'User',
//     label: 'User',
//   }
// ];

class RegUser extends Component {
  state = {
    user: {
      name: '',
      otch: '',
      surname: '',
      dep: '',
      password: '',
      login: '',
      role: ''
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const user = {
          login: values.login,
          password: values.password,
          role: this.state.user.role,
          rules: '',
          worker_id: values.id,
          comment: values.name+' '+values.otch+' '+values.surname+' '+values.dep+' '+values.pos+' '+values.email+' '+values.phone 
        };
        console.log(user);

        // const data = await addUser(user);
        // window.localStorage.setItem('user', data.token);
        // this.props.login(data);
      }
    });

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>

          <Form onSubmit={this.handleSubmit} className="ant-form">
            <Row  gutter={24} className="ant-advanced-search-form">
              <Col span={8} className="ant-form-item">
                <FormItem>
                  {getFieldDecorator('login', {
                    rules: [{ required: true, message: 'Введите логин' }],
                  })(<div>
                      <label>Логин</label>
                      <Input type="text" placeholder="login" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(<div>
                      <label>Пароль</label>
                      <Input type="password" placeholder="Password" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('role', {
                    initialValue: 'User', 
                    rules: [{ type: 'string', required: false }],
                  })(<div>
                      <label>Role</label>
                      <div>
                        <Select style={{ width: 150 }} onChange={ value => this.setState({ user: { role: value } })}>
                          <Option value="Superadmin">Superadmin</Option>
                          <Option value="User">User</Option>
                        </Select>
                      </div>
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('id', {
                    rules: [{ required: true, message: 'Введите табельный номер' }],
                  })(<div>
                      <label>Табельный №</label>
                      <Input type="text" placeholder="Табельный №" />
                    </div>
                  )}
                </FormItem>
              </Col>
            </Row>
            <hr/>
            <Row className="ant-advanced-search-form" gutter={24} >
              <Col span={8} className="ant-form-item">
                <FormItem>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Введите имя' }],
                  })(<div>
                      <label>Имя</label>
                      <Input type="text" placeholder="Имя" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('otch', {
                    rules: [{ required: true, message: 'Введите отчество' }],
                  })(<div>
                      <label>Отчество</label>
                      <Input type="text" placeholder="Отчество" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('surname', {
                    rules: [{ required: true, message: 'Введите фамилию' }],
                  })(<div>
                      <label>Фамилия</label>
                      <Input type="text" placeholder="Фамилия" />
                    </div>
                  )}
                </FormItem>
              </Col>
            </Row>
            <hr/>
            <Row className="ant-advanced-search-form" gutter={24} >
              <Col span={8} className="ant-form-item">
                <FormItem>
                  {getFieldDecorator('dep', {
                    rules: [{ required: true, message: 'Введите подразделение' }],
                  })(<div>
                      <label>Подразделение</label>
                      <Input type="text" placeholder="Подразделение" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('pos', {
                    rules: [{ required: true, message: 'Введите должность' }],
                  })(<div>
                      <label>Должность</label>
                      <Input type="text" placeholder="Должность" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Введите email' }],
                  })(<div>
                      <label>Email</label>
                      <Input type="text" placeholder="Email" />
                    </div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Введите телефон' }],
                  })(<div>
                      <label>Телефон</label>
                      <Input type="text" placeholder="Телефон" />
                    </div>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row className="ant-form-item" gutter={24} >
              <Col span={8} className="ant-form-item">
                <FormItem>
                  <div style={{ padding: 15+'px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <Button type="primary" htmlType="submit" className="reg-form-button">
                        Зарегистрировать
                      </Button>
                    </div>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </Form>
      </div>
    );
  }
}

RegUser.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func,
  form: PropTypes.object
};

const WrappedForm = Form.create()(RegUser);

export default WrappedForm;