/** @format */

import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { Link } from 'react-router';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import './NPMCompare.scss';

import { mock } from './mock';
import CompareItem from './CompareItem';

import { Table } from 'antd';

function dragDirection(
  dragIndex,
  hoverIndex,
  initialClientOffset,
  clientOffset,
  sourceClientOffset
) {
  const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
  const hoverClientY = clientOffset.y - sourceClientOffset.y;
  if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
    return 'downward';
  }
  if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
    return 'upward';
  }
}

let BodyRow = props => {
  const {
    isOver,
    connectDragSource,
    connectDropTarget,
    moveRow,
    dragRow,
    clientOffset,
    sourceClientOffset,
    initialClientOffset,
    ...restProps
  } = props;
  const style = { ...restProps.style, cursor: 'move' };

  let className = restProps.className;
  if (isOver && initialClientOffset) {
    const direction = dragDirection(
      dragRow.index,
      restProps.index,
      initialClientOffset,
      clientOffset,
      sourceClientOffset
    );
    if (direction === 'downward') {
      className += ' drop-over-downward';
    }
    if (direction === 'upward') {
      className += ' drop-over-upward';
    }
  }

  return connectDragSource(
    connectDropTarget(<tr {...restProps} className={className} style={style} />)
  );
};

const rowSource = {
  beginDrag(props) {
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

BodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  sourceClientOffset: monitor.getSourceClientOffset(),
}))(
  DragSource('row', rowSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    dragRow: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset(),
  }))(BodyRow)
);

// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'nameItem',
//     key: 'nameItem',
//     width: 200,
//     fixed: 'left',
//     onFilter: (value, record) => record.name.indexOf(value) === 0,
//   },
//   {
//     title: 'Information',
//     children: [
//       {
//         title: 'Keyword',
//         dataIndex: 'keyword',
//         key: 'keyword',
//         width: 200,
//       },
//       {
//         title: 'Links',
//         dataIndex: 'link',
//         key: 'link',
//         width: 200,
//       },
//       {
//         title: 'Description',
//         dataIndex: 'description',
//         key: 'description',
//         width: 200,
//       },
//       {
//         title: 'Author',
//         dataIndex: 'author',
//         key: 'author',
//         width: 200,
//       },
//     ],
//   },
//   {
//     title: 'Download',
//     children: [
//       {
//         title: 'Daily',
//         dataIndex: 'daily',
//         key: 'daily',
//         sorter: (a, b) => a.daily - b.daily,
//         width: 250,
//       },
//       {
//         title: 'Weekly',
//         dataIndex: 'weekly',
//         key: 'weekly',
//         sorter: (a, b) => a.weekly - b.weekly,
//         width: 250,
//       },
//       {
//         title: 'Monthly',
//         dataIndex: 'monthly',
//         key: 'monthly',
//         sorter: (a, b) => a.monthly - b.monthly,
//         width: 250,
//       },
//     ],
//   },
//   {
//     title: 'Total',
//     dataIndex: 'total',
//     key: 'total',
//     sorter: (a, b) => a.total - b.total,
//     width: 100,
//     fixed: 'right',
//   },
// ];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Information',
    children: [
      {
        title: 'Keyword',
        dataIndex: 'keyword',
        key: 'keyword',
        width: 200,
        sorter: (a, b) => a.keyword - b.keyword,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: 200,
      },
      {
        title: 'Link',
        dataIndex: 'link',
        key: 'link',
        width: 100,
      },
      {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
        width: 100,
      },
    ],
  },
  {
    title: 'Download',
    children: [
      {
        title: 'Daily',
        dataIndex: 'dailyDownload',
        key: 'dailyDownload',
        width: 100,
        sorter: (a, b) => a.dailyDownload - b.dailyDownload,
      },
      {
        title: 'Weekly',
        dataIndex: 'weeklyDownload',
        key: 'weekylyDownload',
        width: 100,
        sorter: (a, b) => a.weekylyDownload - b.weekylyDownload,
      },
      {
        title: 'Monthly',
        dataIndex: 'monthlyDownload',
        key: 'monthlyDownload',
        width: 100,
        sorter: (a, b) => a.monthlyDownload - b.monthlyDownload,
      },
    ],
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    width: 100,
    fixed: 'right',
    sorter: (a, b) => a.total - b.total,
  },
];

const data = [
  {
    name: 'ABC',
    keyword: 'asdasd',
    description: 'asdkkh',
    link: 'sadkjh',
    author: 'asdkkh',
    dailyDownload: 100,
    weeklyDownload: 200,
    monthlyDownload: 300,
    total: 10,
  },
];

class DragSortingTable extends React.Component {
  state = {
    data: data,
  };

  components = {
    body: {
      row: BodyRow,
    },
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      })
    );
  };

  render() {
    console.log(this.state.data);
    return (
      <Table
        columns={columns}
        dataSource={this.state.data}
        components={this.components}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow,
        })}
        scroll={{ x: '140%' }}
      />
    );
  }
}

const NPMCompare = DragDropContext(HTML5Backend)(DragSortingTable);

export default NPMCompare;
