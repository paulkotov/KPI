import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

import 'antd/lib/button/style/index.css';
import 'antd/lib/upload/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/style/index.css';

class StructureModal extends Component {
  state = {
    node: {
      id: '',
      name: ''
    }
  };

  clickHandler = e => {
    this.setState({ isFileLoaded: this.props.dataHandler(e) });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        // this.props.dataHandler(user);
      }
    });
  }

  render() {
    const { isEditModalShown, toggleEditModal } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { id, name, parent_id } = this.props.data;

    return (
      <div>
        <Modal
          width={650}
          title="Edit department"
          style={{ top: 20 }}
          visible={isEditModalShown}
          onCancel={() => toggleEditModal()}
          onOk={() => console.log('OK')}
          footer ={[
            <Button onClick={toggleEditModal}>Закрыть</Button>
          ]}
        > 
          <Form onSubmit={this.handleSubmit} className="ant-form">  
            <Row className="ant-advanced-search-form" >
                <Col className="ant-form-item">
                    <FormItem>
                      <label>Id подразделения</label>
                        {getFieldDecorator('id', {
                          initialValue: id
                        })(
                          <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem>
                      <label>Название подразделения</label>
                        {getFieldDecorator('name', {
                          initialValue: name,
                          rules: [{ required: false }],
                        })(
                          <Input type="text" />
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row  className="ant-advanced-search-form" gutter={24}>
              <Col className="ant-form-item">
                <FormItem>
                  <label>Id корневого подразделения</label>
                  {getFieldDecorator('parent_id', {
                    initialValue: parent_id,
                    rules: [{ required: false }],
                  })(
                    <Input type="text" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row className="ant-advanced-search-form" gutter={24}>
              <Col className="ant-form-item">
                <FormItem>
                  <Button type="primary" htmlType="submit" className="reg-form-button">Сохранить</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

StructureModal.propTypes = {
  isEditModalShown : PropTypes.bool,
  toggleEditModal : PropTypes.func,
  dataHandler: PropTypes.func,
  data: PropTypes.object,
  form: PropTypes.object
};

const WrappedDemo = Form.create()(StructureModal);

export default WrappedDemo;