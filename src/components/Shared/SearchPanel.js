import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Row, Input, Button } from 'antd';

import 'antd/lib/input/style/index.css';
import '../style.css';
import '../MenuItems/users.css';
import 'antd/dist/antd.css';
// const Search = Input.Search;

const FormItem = Form.Item;

class SearchPanel extends Component {
  state = {
    expand: false,
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    // return(
    //   <div style={{ heigth: 100+'px', padding: 10+'px' }}>
    //     <Search
    //       placeholder="input search text"
    //       onSearch={value => console.log(value)}
    //       enterButton
    //     />
    //   </div>
    // );
    return(
      <Form
        className="search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={16}
              className="search-form-row" 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2>Поиск</h2> 
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
    );
  }
}

SearchPanel.propTypes = {
  form: PropTypes.object
};

const WrappedForm = Form.create()(SearchPanel);

export default WrappedForm;