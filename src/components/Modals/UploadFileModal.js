import React, { Component } from 'react';
import { Modal, Upload, Form, Icon } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

import 'antd/lib/button/style/index.css';
import 'antd/lib/upload/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/style/index.css';

class FileLoadModal extends Component {
  state = {
    isFileLoaded: false
  }

  clickHandler = e => {
    this.setState({ isFileLoaded: this.props.fileHandler(e) });
  }

  render() {
    const { isUploadModalShown, toggleUploadModal } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
          console.log(file, fileList);
        }
      },
      defaultFileList: [],
    };
    return (
      <div>
        <Modal
          title="Load file"
          style={{ top: 20 }}
          visible={isUploadModalShown}
          onCancel={() => toggleUploadModal()}
          onOk={() => console.log('OK')}
        >
          <Form>  
            <FormItem
              {...formItemLayout}
              >
              <div className="dropbox">
                {getFieldDecorator('dragger', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload.Dragger {...props} name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                  </Upload.Dragger>
                )}
              </div>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

FileLoadModal.propTypes = {
  isUploadModalShown : PropTypes.bool,
  toggleUploadModal : PropTypes.func,
  fileHandler: PropTypes.func,
  form: PropTypes.object
};

const WrappedDemo = Form.create()(FileLoadModal);

export default WrappedDemo;