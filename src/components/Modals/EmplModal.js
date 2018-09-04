import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

import 'antd/lib/button/style/index.css';
import 'antd/lib/upload/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/style/index.css';

class EmplModal extends Component {
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
    const { isModalShown, toggleModal } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { id, dir, pos, empl, t_id, date1, date2, date3, param1, text } = this.props.data;

    return (
      <div>
        <Modal
          width={650}
          title="Edit department"
          style={{ top: 20 }}
          visible={isModalShown}
          onCancel={() => toggleModal()}
          onOk={() => console.log('OK')}
          footer ={[
            <Button onClick={toggleModal}>Закрыть</Button>
          ]}
        > 
          <Form onSubmit={this.handleSubmit} className="ant-form">  
            <Row className="ant-advanced-search-form" >
                <Col className="ant-form-item">
                    <FormItem>
                      <label>Номер</label>
                        {getFieldDecorator('id', {
                          initialValue: id
                        })(
                          <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem>
                      <label>Подразделение</label>
                        {getFieldDecorator('dir', {
                          initialValue: dir,
                          rules: [{ required: false }],
                        })(
                          <Input type="text" />
                        )}
                    </FormItem>
                    <FormItem>
                      <label>Должность</label>
                      {getFieldDecorator('pos', {
                        initialValue: pos,
                        rules: [{ required: false }],
                      })(
                        <Input type="text" />
                      )}
                    </FormItem>
                    <FormItem>
                      <label>Сотрудник</label>
                      {getFieldDecorator('empl  ', {
                        initialValue: empl,
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
                  <label>Сотрудник</label>
                  {getFieldDecorator('empl  ', {
                    initialValue: empl,
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

EmplModal.propTypes = {
  isModalShown : PropTypes.bool,
  toggleModal : PropTypes.func,
  dataHandler: PropTypes.func,
  data: PropTypes.object,
  form: PropTypes.object
};

EmplModal.defaultProps = {
  data: {
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
  }
};

const WrappedDemo = Form.create()(EmplModal);

export default WrappedDemo;