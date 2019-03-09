import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
const CollectionEditForm = Form.create()(
  (props) => {
    const { visible, onCancel, onEdit, form, data } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Edit a new application"
        okText="Edit"
        onCancel={onCancel}
        onOk={onEdit}
      >
        <Form layout="vertical">
          <FormItem label="name">
            {getFieldDecorator('name', {
              initialValue: data.name,
              rules: [{ required: true, message: 'Please input the name of application!' }],
            })(
              <Input />
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
