import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination, Icon } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import uuid from 'uuid';
//
import { ROUTES } from 'config/constants';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm';

class PublicApplicationsTable extends React.PureComponent {
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
            <Link to={`${ROUTES.PUBLIC_NOTES}?applicationId=${data.id}`}>
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
        render: (text, data) => (
          <Link to={`${ROUTES.PUBLIC_NOTES}?applicationId=${data.id}`}>
            <Icon type="select" />
            <span>&nbsp;Notes</span>
          </Link>
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

export default PublicApplicationsTable;
