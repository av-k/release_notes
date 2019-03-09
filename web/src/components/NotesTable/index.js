import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination, Icon, Popconfirm } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import uuid from 'uuid';
//
import { ROUTES } from 'config/constants';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm';

class ApplicationTable extends React.PureComponent {
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
            <Link to={ROUTES.ADMIN_NOTES.replace(':applicationId', data.id)}>{text}</Link>
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
        render: (text, data) => (
          <Fragment>
            <Link to={ROUTES.ADMIN_NOTES.replace(':id', data.id)}>
              <Icon type="select" />
              <span>&nbsp;Notes</span>
            </Link>
            <a href="javascript:void(0);" onClick={e => this.props.onEdit({data})}>
              &nbsp;
              &nbsp;
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
        )
      }
    ];

    return columns;
  };

  onChange = (page) => {
    this.props.onChange({ page });
  };

  render() {
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
      </Fragment>
    );
  }
}

export default ApplicationTable;
