import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new application"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="name">
            {getFieldDecorator('name', {
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

  handleCreate = () => {
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
    const { loading, button, style = {} } = this.props;
    const buttonView = button || (
      loading
        ? <Button type="primary" loading>Loading</Button>
        : <Button type="primary" onClick={this.showModal}>New Application</Button>
    );

    return (
      <section style={style} className="new-application-section">
        {buttonView}
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </section>
    );
  }
}

export default Index;
