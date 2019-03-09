import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination, Icon, Popconfirm } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import uuid from 'uuid';
//
import { ROUTES } from 'config/constants';
import EditApplicationModal from 'components/EditApplicationModal';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm';

class AdminApplicationsTable extends React.PureComponent {
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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, data) => {
          return (
            <Link to={`${ROUTES.ADMIN_NOTES}?applicationId=${data.id}`}>
              {text}
            </Link>
          );
        }
      },
      {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'created',
        render: (text) => moment(text).format(DATE_FORMAT)
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, data) => {
          return (
            <Fragment>
              <Link to={`${ROUTES.ADMIN_NOTES}?applicationId=${data.id}`}>
                <Icon type="select" />
                <span>&nbsp;Notes</span>
              </Link>
              <a href="javascript:void(0);" onClick={el => this.onEdit(data)}>
                &nbsp;
                &nbsp;
                <Icon type="edit" />
                <span>&nbsp;Edit</span>
              </a>
              <Popconfirm title="Are you sure delete this application?"
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
        <EditApplicationModal visible={visible}
                              data={currentData}
                              onCancel={this.onCancel}
                              onSubmit={this.onSubmit} />
      </Fragment>
    );
  }
}

export default AdminApplicationsTable;
