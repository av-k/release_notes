import React, { Fragment } from 'react';
import { Table, Pagination, Icon, Popconfirm, Switch, Tooltip } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import uuid from 'uuid';
//
import EditNoteModal from 'components/EditNoteModal';
import { ColDescriptionWrapper } from './index.styled';

const DATE_FORMAT = 'YYYY-MM-DD';

class AdminNotesTable extends React.PureComponent {
  state = {
    visible: false,
    currentData: {}
  };

  getColumns = () => {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'ApplicationID',
        dataIndex: 'applicationId',
        key: 'applicationId'
      },
      {
        title: 'Version',
        dataIndex: 'version',
        key: 'version'
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (text, data) => (
          <Tooltip title={text} placement='bottom'>
            <ColDescriptionWrapper>
              {text}
            </ColDescriptionWrapper>
          </Tooltip>
        )
      },
      {
        title: 'Release Date',
        dataIndex: 'releaseDate',
        key: 'releaseDate',
        render: (text) => moment(text).format(DATE_FORMAT)
      },
      {
        title: 'Published',
        dataIndex: 'published',
        key: 'published',
        render: (statement, data) => (
          <Switch defaultChecked={statement} onChange={event => this.onChangePublish(event, data)} />
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, data) => {
          return (
            <Fragment>
              <a href="javascript:void(0);" onClick={el => this.onEdit(data)}>
                <Icon type="edit" />
                <span>&nbsp;Edit</span>
              </a>
              <Popconfirm title="Are you sure delete this note?"
                          onConfirm={e => this.props.onDelete(data)}
                          okText="Yes"
                          cancelText="No">
                <a href="javascript:void(0);">
                  &nbsp;
                  &nbsp;
                  <Icon type="delete" />
                  <span>&nbsp;Delete</span>
                </a>
              </Popconfirm>
            </Fragment>
          );
        }
      }
    ];

    return columns;
  };

  onChange = (page) => {
    this.props.onChange({ page });
  };

  onChangePublish = (statement, data = {}) => {
    if (typeof this.props.onChangePublish === 'function') {
      this.props.onChangePublish({...data, published: statement});
    }
  };

  onEdit = (data = {}) => {
    this.setState({
      visible: true,
      currentData: data
    });
  };

  onCancel = () => {
    this.setState({ visible: false });
  };

  onSubmit = (event) => {
    const { currentData } = this.state;
    this.setState({ visible: false });
    this.props.onEdit({...currentData, ...event});
  };

  render() {
    const { visible, currentData } = this.state;
    const { data, loading, pageSize, defaultCurrent } = this.props;
    const results = lodash.get(data, 'results', []);
    const totalCount = lodash.get(data, 'meta.totalCount', 0);
    const dataSource = results.map(item => {
      item.key = uuid.v4();
      return item;
    });

    return (
      <Fragment>
        <Pagination style={{ marginBottom: '30px', textAlign: 'center' }}
                    defaultCurrent={defaultCurrent}
                    pageSize={pageSize}
                    total={totalCount}
                    onChange={this.onChange} />
        <Table columns={this.getColumns()}
               dataSource={dataSource}
               pagination={false}
               loading={loading} />
        <EditNoteModal visible={visible}
                       data={currentData}
                       onCancel={this.onCancel}
                       onSubmit={this.onSubmit} />
      </Fragment>
    );
  }
}

export default AdminNotesTable;
