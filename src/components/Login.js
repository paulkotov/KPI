import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';

import { getUser } from '../lib/api';
const FormItem = Form.Item;

import 'antd/lib/form/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/checkbox/style/index.css';
import 'antd/lib/card/style/index.css';
import './style.css';
import 'antd/lib/style/index.css';

class Login extends Component {
  state = {
    user: {
      userName: '',
      password: '',
      incorrect: false
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const data = await getUser(values.userName, values.password);
        if (data !== null){
          window.localStorage.setItem('user', data.token);
          this.props.login(data);
        } else {
          this.setState({ user: { incorrect: true } });
        }
      }
    });

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { incorrect } = this.state.user;
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Card style={{ width: 350+'px' }}>
            <Form onSubmit={this.handleSubmit} style={{ border: 'none' }}>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Введите логин' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Введите пароль' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                <div style={{ display: 'flex', alignContent: 'flex-center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex' }}><Checkbox>Remember me</Checkbox></div>
                  <a className="login-form-forgot" href="/sendpas" style={{ display: 'flex' }}>Забыли пароль?</a>
                </div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', margin: 15+'px' }}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Вход
                    </Button>
                  </div>
              </FormItem>
            </Form>        
            { incorrect && <div style={{ color: 'red', textAlign: 'center' }}><b>Incorrect login or password</b></div> }     
          </Card>
        </div>

    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func,
  form: PropTypes.object
};

const WrappedForm = Form.create()(Login);

export default WrappedForm;