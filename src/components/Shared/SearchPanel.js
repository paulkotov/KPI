import React, { Component } from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Form, Row, Input, Button, Switch } from 'antd';

import 'antd/lib/input/style/index.css';
import 'antd/lib/switch/style/index.css';
import '../style.css';
import '../MenuItems/users.css';
import 'antd/dist/antd.css';
// const Search = Input.Search;

const FormItem = Form.Item;

class SearchPanel extends Component {
  state = {
    expand: false,
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log('Received values of form: ', values);
      this.props.handler(values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    // const { expand } = this.state;
    this.setState({ expand : !this.state.expand });
    // console.log(change.value);
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <React.Fragment>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline' }}>
          <div style={{ paddingRight: 20+'px' }}>
            <h2>Поиск</h2>
          </div>
          <div onClick={this.toggle} style={{ paddingLeft: 20+'px' }}>
          <Switch checked={ this.state.expand } onChange={ this.toggle }/>
          </div>
        </div>
        {this.state.expand && 
        <Form
          className="search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={16}
            className="search-form-row" 
            style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline' }}>
            <FormItem label="ФИО">
              {getFieldDecorator('fio', {
                rules: [{
                  required: false,
                  message: 'Введите данные',
                }],
              })(
                <Input placeholder="ФИО" />
              )}
            </FormItem>
            <FormItem label="Подразделение">
              {getFieldDecorator('dep', {
                rules: [{
                  required: false,
                  message: 'Введите подразделение',
                }],
              })(
                <Input placeholder="Подразделение" />
              )}
            </FormItem>
            <FormItem>
              <div style={{ display: 'flex', margin: 5+'px' }}>
                <Button type="primary" htmlType="submit">Search</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                  Clear
                </Button>            
              </div>
            </FormItem>
          </Row>
        </Form>
        }
      </React.Fragment>
    );
  }
}

SearchPanel.propTypes = {
  handler: PropTypes.func,
  form: PropTypes.object
};

const WrappedForm = Form.create()(SearchPanel);

export default WrappedForm;