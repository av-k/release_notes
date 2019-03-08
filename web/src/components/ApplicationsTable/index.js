import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination, Icon } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import uuid from 'uuid';
//
import { ROUTES } from 'config/constants';

const DATA_FORMAT = 'YYYY-MM-DD HH:mm';
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
        <Link to={ROUTES.APPLICATION.replace(':id', data.id)}>{text}</Link>
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
    render: (text, data) => <Link to={ROUTES.APPLICATION.replace(':id', data.id)}>
      <Icon type="select" />
      <span>&nbsp;Notes</span>
    </Link>
  }
];

class ApplicationTable extends React.PureComponent {
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
        <Table columns={columns}
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

export default ApplicationTable;
