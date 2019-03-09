import React, { Fragment } from 'react';
import { Table, Pagination, Tooltip } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import uuid from 'uuid';
//
import { ColDescriptionWrapper } from './index.styled';

const DATE_FORMAT = 'YYYY-MM-DD';

class PublicNotesTable extends React.PureComponent {
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

export default PublicNotesTable;
