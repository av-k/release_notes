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
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
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
    const { loading, button, data = {}, style = {} } = this.props;
    const buttonView = button || (
      loading
        ? <Button type="primary" loading>Loading</Button>
        : <Button type="primary" onClick={this.showModal}>Edit Application</Button>
    );

    return (
      <section style={style} className="edit-application-section">
        <span onClick={this.showModal}>
          {buttonView}
        </span>
        <CollectionEditForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          data={data}
          onCancel={this.handleCancel}
          onEdit={this.handleEdit}
        />
      </section>
    );
  }
}

export default Index;
