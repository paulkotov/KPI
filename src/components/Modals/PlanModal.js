import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';

//styles
import 'antd/lib/button/style/index.css';
import 'antd/lib/upload/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/style/index.css';

const FormItem = Form.Item;
// const Option = Select.Option;

const formField = (name, param, getFieldDecorator) => {
  const index = name.split("").reverse().join("")[0];
  const label = (name[0] == 'm') ? 'Месяц' : 'Квартал'; 
  return (
    <FormItem>
      <label>{`${label} ${index}`}</label>
      {getFieldDecorator(`${name}`, {
        initialValue: param,
        rules: [{ required: true, message: `${label} ${index}` }],
      })(
          <Input type="text"/>
      )}
    </FormItem>
  );
};

class PlanModal extends Component {
  static defaultprops = {
    newRow: {
      pod: '',
      pos: '',
      empl: '',
      plan_perem_id: '',
      plan_weight: '',
      m1: '',
      m2: '',
      m3: '',
      kv1: '',
      m4: '',
      m5: '',
      m6: '',
      kv2: '',
      m7: '',
      m8: '',
      m9: '',
      kv3: '',
      m10: '',
      m11: '',
      m12: '',
      kv4: '',
      year: ''
    }
  };
  
  state = {
    newRow: {
      pod: '',
      pos: '',
      empl: '',
      plan_perem_id: '',
      plan_weight: '',
      m1: '',
      m2: '',
      m3: '',
      kv1: '',
      m4: '',
      m5: '',
      m6: '',
      kv2: '',
      m7: '',
      m8: '',
      m9: '',
      kv3: '',
      m10: '',
      m11: '',
      m12: '',
      kv4: '',
      year: ''
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
          comment: values.name+' '+values.otch+' '+values.surname+' '+values.dept+' '+values.pos+' '+values.email+' '+values.phone 
        };
        this.props.dataHandler(user);
      }
    });
  }

  render() {
    const { isAddModalShown, togglePlanModal } = this.props;
    const { getFieldDecorator } = this.props.form;
    const {
      pod,
      pos,
      empl,
      plan_perem_id,
      plan_weight,
      m1,
      m2,
      m3,
      kv1,
      // m4,
      // m5,
      // m6,
      // kv2,
      // m7,
      // m8,
      // m9,
      // kv3,
      // m11,
      // m12,
      // kv4,
      // year
    } = this.props.data;
    return (
      <div>
        <Modal
          title="New plan row"
          width={750}
          style={{ top: 20 }}
          visible={isAddModalShown}
          onCancel={() => togglePlanModal()}
          onOk={() => { console.log('OK'); }}
          footer ={[
            <Button onClick={togglePlanModal}>Закрыть</Button>
          ]}
        >
          <Form onSubmit={this.handleSubmit} className="ant-form">  
            <Row className="ant-advanced-search-form">
              <Col className="ant-form-item">
                <FormItem>
                  <label>Подразделение</label>
                  {getFieldDecorator('pod', {
                    initialValue: pod,
                    rules: [{ required: false, message: 'Введите подразделение' }],
                  })(
                      <Input type="text"/>
                  )}
                </FormItem>
                <FormItem>
                  <label>Должность</label>
                  {getFieldDecorator('pos', {
                    initialValue: pos,
                    rules: [{ required: false, message: 'Введите подразделение' }],
                  })(
                      <Input type="text"/>
                  )}
                </FormItem>
                <FormItem>
                  <label>Работник</label>
                  {getFieldDecorator('empl', {
                    initialValue: empl,
                    rules: [{ required: false, message: 'Введите имя' }],
                  })(
                    <Input type="text"/>
                  )}
                </FormItem>
                <FormItem>
                  <label>Табельный №</label>
                  {getFieldDecorator('plan_perem_id', {
                    initialValue: plan_perem_id,
                    rules: [{ required: false, message: 'План ID' }],
                  })(
                      <Input type="text"/>
                  )}
                </FormItem>
                <FormItem>
                  <label>Вес</label>
                  {getFieldDecorator('plan_weight', {
                    initialValue: plan_weight,
                    rules: [{ required: false, message: 'Введите вес' }],
                  })(
                      <Input type="text"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <hr/>
            <Row className="ant-advanced-search-form">
              <Col className="ant-form-item">
                { formField('m1', m1, getFieldDecorator) }
                { formField('m2', m2, getFieldDecorator) }
                { formField('m3', m3, getFieldDecorator) }
                { formField('kv1', kv1, getFieldDecorator) }
              </Col>
            </Row>
            <hr/>
            <Row className="ant-advanced-search-form" gutter={24} >
              <Col className="ant-form-item">
                <FormItem>
                  <label>Подразделение</label>
                  {getFieldDecorator('m3', {
                    initialValue: m3,
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
                        Добавить
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

PlanModal.propTypes = {
  isAddModalShown: PropTypes.bool,
  togglePlanModal : PropTypes.func,
  data: PropTypes.shape({
    pod: PropTypes.string,
    pos: PropTypes.string,
    empl: PropTypes.string,
    plan_perem_id: PropTypes.string,
    plan_weight: PropTypes.string,
    m1: PropTypes.string,
    m2: PropTypes.string,
    m3: PropTypes.string,
    kv1: PropTypes.string,
    m4: PropTypes.string,
    m5: PropTypes.string,
    m6: PropTypes.string,
    kv2: PropTypes.string,
    m7: PropTypes.string,
    m8: PropTypes.string,
    m9: PropTypes.string,
    kv3: PropTypes.string,
    m10: PropTypes.string,
    m11: PropTypes.string,
    m12: PropTypes.string,
    kv4: PropTypes.string,
    year: PropTypes.string
  }),
  dataHandler: PropTypes.func,
  form: PropTypes.object
};

const WrappedDemo = Form.create()(PlanModal);

export default WrappedDemo;