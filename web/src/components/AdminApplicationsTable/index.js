import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination, Icon, Popconfirm } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import uuid from 'uuid';
//
import { ROUTES } from 'config/constants';
import EditApplicationButton from 'components/EditApplicationButton';

const DATA_FORMAT = 'YYYY-MM-DD HH:mm';

class AdminApplicationsTable extends React.PureComponent {
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
        render: (text) => moment(text).format(DATA_FORMAT)
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, data) => {
          const editButtonView = (
            <a href="javascript:void(0);">
              &nbsp;
              &nbsp;
              <Icon type="edit" />
              <span>&nbsp;Edit</span>
            </a>
          );

          return (
            <Fragment>
              <Link to={ROUTES.ADMIN_NOTES.replace(':applicationId', data.id)}>
                <Icon type="select" />
                <span>&nbsp;Notes</span>
              </Link>
              <EditApplicationButton button={editButtonView}
                                     style={{display: 'inline-block'}}
                                     data={data}
                                     onSubmit={event => this.props.onEdit({...data, ...event})} />
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
        <Table columns={this.getColumns()}
               dataSource={dataSource}
               pagination={false}
               loading={loading} />
        <Pagination style={{
                      marginTop: '30px',
                      textAlign: 'center'
                    }}
                    defaultCurrent={defaultCurrent}
                    pageSize={pageSize}
                    total={totalCount}
                    onChange={this.onChange} />
      </Fragment>
    );
  }
}

export default AdminApplicationsTable;
