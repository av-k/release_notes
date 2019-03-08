import React, { Fragment } from 'react';
import { Table, Pagination } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import uuid from 'uuid';

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
    render: text => <a href="javascript:;">{text}</a>
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
    render: (text, record) => (
      <span>
        <a href="javascript:;">Show Notes</a>
      </span>
    ),
  }
];

class ApplicationTable extends React.PureComponent {
  onChange = (page) => {
    this.props.onChange({ page });
  };

  render() {
    const { data, loading, pageSize } = this.props;
    const totalCount = lodash.get(data, 'meta.totalCount', 0);
    const dataSource = data.results.map(item => {
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
                    defaultCurrent={data.meta.page + 1}
                    pageSize={pageSize}
                    total={totalCount}
                    onChange={this.onChange} />
      </Fragment>
    );
  }
}

export default ApplicationTable;
