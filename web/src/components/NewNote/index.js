import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new note"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="version">
            {getFieldDecorator('version', {
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
              rules: [{ required: true, message: 'Please input the description of application!' }],
            })(
              <Input.TextArea rows={4} />
            )}
          </FormItem>
          <FormItem className="collection-create-form_last-form-item">
            {getFieldDecorator('published', {
              initialValue: '1',
            })(
              <Radio.Group>
                <Radio value='1'>Published</Radio>
                <Radio value='0'>Not published</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('releaseDate', {
              initialValue: moment(),
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
    const { loading } = this.props;

    return (
      <section className="new-application-section">
        {loading
          ? <Button type="primary" loading>Loading</Button>
          : <Button type="primary" onClick={this.showModal}>New Note</Button>
        }
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
