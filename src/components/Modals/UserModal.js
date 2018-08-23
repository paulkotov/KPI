import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';

//styles
import 'antd/lib/button/style/index.css';
import 'antd/lib/upload/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/style/index.css';

const FormItem = Form.Item;
const Option = Select.Option;

class UserModal extends Component {
  state = {
    isFileLoaded: false,
    user: {
      name: 'user',
      otch: '',
      surname: '',
      dep: '',
      password: '',
      login: '',
      role: ''
    }
  }

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
          comment: values.name+' '+values.otch+' '+values.surname+' '+values.dept+' '+values.pos+' '+values.email+' '+values.phone 
        };
        this.props.dataHandler(user);
      }
    });
  }

  render() {
    const { isAddModalShown, toggleAddModal, rules } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { login, password, id, role, dept, pos, name, otch, surname  } = this.props.data;
    return (
      <div>
        <Modal
          title="Add user"
          width={1000}
          style={{ top: 20 }}
          visible={isAddModalShown}
          onCancel={() => toggleAddModal()}
          onOk={() => { console.log('OK'); }}
          footer ={[
            <Button onClick={toggleAddModal}>Закрыть</Button>
          ]}
        >
          <Form onSubmit={this.handleSubmit} className="ant-form">  
            <Row className="ant-advanced-search-form">
              <Col className="ant-form-item">
                <FormItem>
                  <label>Логин</label>
                  <br/>
                  {getFieldDecorator('login', {
                    initialValue: login,
                    rules: [{ required: false, message: 'Введите логин' }],
                  })(
                      <Input type="text"/>
                  )}
                </FormItem>
                <FormItem>
                  <label>Пароль</label>
                  {getFieldDecorator('password', {
                    initialValue: password,
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                      <Input type="password"/>
                  )}
                </FormItem>
                <FormItem>
                  <label>Права</label>
                  {getFieldDecorator('role', {
                    initialValue: role,
                    rules: [{ type: 'string', required: false }],
                  })(
                      <Select style={{ width: 300 }} onChange={ value => this.setState({ user: { role: value } })}>
                        <Option key={"All"} value="All">All</Option>
                        {rules.map( (item, idx) => 
                          <Option key={idx} value={`${item.id}.${item.name}`}>
                            {`${item.id}. ${item.name}`}
                          </Option> )
                        } 
                      </Select>
                  )}
                </FormItem>
                <FormItem>
                  <label>Табельный №</label>
                  {getFieldDecorator('id', {
                    initialValue: id,
                    rules: [{ required: true, message: 'Введите табельный номер' }],
                  })(
                      <Input type="text"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <hr/>
            <Row className="ant-advanced-search-form" gutter={24} >
              <Col className="ant-form-item">
                <FormItem>
                  <label>Имя</label>
                  {getFieldDecorator('name', {
                    initialValue: name,
                    rules: [{ required: true, message: 'Введите имя' }],
                  })(
                      <Input type="text"/>
                  )}
                </FormItem>
                <FormItem>
                  <label>Отчество</label>
                  {getFieldDecorator('otch', {
                    initialValue: otch,
                    rules: [{ required: true, message: 'Введите отчество' }],
                  })(
                      <Input type="text"/>
                  )}
                </FormItem>
                <FormItem>
                  <label>Фамилия</label>
                  {getFieldDecorator('surname', {
                    initialValue: surname,
                    rules: [{ required: true, message: 'Введите фамилию' }],
                  })(
                      <Input type="text"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <hr/>
            <Row className="ant-advanced-search-form" gutter={24} >
              <Col className="ant-form-item">
                <FormItem>
                  <label>Подразделение</label>
                  {getFieldDecorator('dept', {
                    initialValue: dept,
                    rules: [{ required: true, message: 'Введите подразделение' }],
                  })(
                      <Input type="text"/>
                  )}
                </FormItem>
                <FormItem>
                  <label>Должность</label>
                  {getFieldDecorator('pos', {
                    initialValue: pos,
                    rules: [{ required: true, message: 'Введите должность' }],
                  })(
                      <Input type="text"/>
                  )}
                </FormItem>
                <FormItem>
                  <label>Email</label>
                  {getFieldDecorator('email', {
                    initialValue: '',
                    rules: [{ required: true, message: 'Введите email' }],
                  })(
                      <Input type="text"/>
                  )}
                </FormItem>
                <FormItem>
                  <label>Телефон</label>
                  {getFieldDecorator('phone', {
                    initialValue: '',
                    rules: [{ required: true, message: 'Введите телефон' }],
                  })(
                      <Input type="text"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row className="ant-form-item" gutter={24} >
              <Col className="ant-form-item">
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
        </Modal>
      </div>
    );
  }
}

UserModal.propTypes = {
  isAddModalShown: PropTypes.bool,
  toggleAddModal : PropTypes.func,
  data: PropTypes.object,
  rules: PropTypes.array,
  dataHandler: PropTypes.func,
  form: PropTypes.object
};

const WrappedDemo = Form.create()(UserModal);

export default WrappedDemo;