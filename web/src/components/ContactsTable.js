import React from "react";
import Table from "antd/es/table";

import "antd/es/table/style/index.css";
import "antd/es/pagination/style/index.css";
import "./contacts-table.css";

const valueRender = (value) => {
  if (typeof value === "string" || typeof value === "undefined") {
    return value || "";
  }
  return (
    <>
      {value.map((v, i) => (
        <div key={i}>{v}</div>
      ))}
    </>
  );
};

const ContactsTable = ({ contacts }) => {
  const columns = [
    {
      dataIndex: "fn",
      title: "Name",
      render: valueRender,
      width: "20vw",
    },
    {
      dataIndex: "email",
      title: "Email",
      render: valueRender,
      width: "20vw",
    },
    {
      dataIndex: "tel",
      title: "Number",
      render: valueRender,
      width: "20vw",
    },
    {
      dataIndex: "adr",
      title: "Address",
      render: valueRender,
      align: "center",
    },
  ];

  return (
    <Table
      dataSource={contacts}
      columns={columns}
      tableLayout="fixed"
      pagination={{ showSizeChanger: false }}
      scroll={{ y: "75vh" }}
    />
  );
};

export default ContactsTable;
