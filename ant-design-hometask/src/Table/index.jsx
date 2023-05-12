import Table  from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../api/requests';
import moment from "moment"
import './index.css';

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const TableSection = () => {
  const [orders, setOrders] = useState([]);

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerId',
      filters: orders.map((order) => ({
        text: order.customerId,
        value: order.customerId,
      })),
      onFilter: (value, record) => record.customerId.indexOf(value) === 0,
    },
    {
      title: 'Freight',
      dataIndex: 'freight',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.freight - b.freight,
    },
    {
      title: 'Address',
      dataIndex: 'shipAddress',
      render: (value) => (
        <span>{value.country} , {value.city}</span>
      ),
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      defaultSortOrder: 'descend',
      render: (value) => moment(value).format("MMM Do YY"),
      sorter: (a, b) => {
        const dataA = moment(a.orderDate, "YYYY-MM-DD");
        const dataB = moment(b.orderDate, "YYYY-MM-DD");
        return dataA - dataB;
      }
    },
    {
      title: 'Required Date',
      dataIndex: 'requiredDate',
      defaultSortOrder: 'descend',
      render: (value) => moment(value).format("MMM Do YY")
    },
    {
      title: 'Shipped Date',
      dataIndex: 'shippedDate',
      defaultSortOrder: 'descend',
      render: (value) => moment(value).format("MMM Do YY")
    },
  ];

  useEffect(() => {
    getAllOrders().then((data) => {
      setOrders(data);
    });
  }, [setOrders]);

  return (
    <Table
      columns={columns}
      dataSource={orders.map((order) => ({ ...order, key: order.id }))}
      onChange={onChange}
      rowClassName={(record) =>
        record.shippedDate > record.requiredDate ? "red-row" : ""
      }
    />
  );
};

export default TableSection