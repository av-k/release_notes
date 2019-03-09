import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const CollectionEditForm = Form.create()(
  (props) => {
    const { visible, onCancel, onEdit, form, data } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Edit a note"
        okText="Edit"
        onCancel={onCancel}
        onOk={onEdit}
      >
        <Form layout="vertical">
          <FormItem label="version">
            {getFieldDecorator('version', {
              initialValue: data.version,
              rules: [
                { pattern: /^(\d+\.)(\d+\.)(\*|\d+)$/, message: 'Expected format `xxx.yyy.zzz`. Where `x/y/s` are numbers!' },
                { required: true, message: 'Please input the version of application!' }
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="description">
            {getFieldDecorator('description', {
              initialValue: data.description,
              rules: [{ required: true, message: 'Please input the description of note!' }],
            })(
              <Input.TextArea rows={4} />
            )}
          </FormItem>
          <FormItem className="collection-create-form_last-form-item">
            {getFieldDecorator('published', {
              initialValue: data.published ? '1' : '0',
            })(
              <Radio.Group>
                <Radio value='1'>Published</Radio>
                <Radio value='0'>Not published</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('releaseDate', {
              initialValue: moment(data.releaseDate),
            })(
              <DatePicker
                placeholder="Release Date"
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

class Index extends Component {
  handleCancel = () => {
    if (typeof this.props.onCancel === 'function') {
      this.props.onCancel();
    }
  };

  handleEdit = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      if (typeof this.props.onSubmit === 'function') {
        this.props.onSubmit(values);
      }

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (form) => {
    this.form = form;
  };

  render() {
    const { visible, data = {}, style = {} } = this.props;

    return (
      <section style={style} className="edit-note-section">
        <CollectionEditForm
          ref={this.saveFormRef}
          data={data}
          visible={visible}
          onCancel={this.handleCancel}
          onEdit={this.handleEdit}
        />
      </section>
    );
  }
}

export default Index;
