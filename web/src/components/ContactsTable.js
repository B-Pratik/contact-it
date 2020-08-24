import React from "react";
import Table from "antd/es/table";
// import Input from "antd/es/input";
// import Button from "antd/es/button";
// import Space from "antd/es/space";
// import SearchOutlined from "@ant-design/icons/es/icons/SearchOutlined";
import { contactsMapper } from "./contacts.helper";

import "antd/es/table/style/index.css";
import "antd/es/pagination/style/index.css";
// import "antd/es/input/style/index.css";
// import "antd/es/button/style/index.css";
// import "antd/es/space/style/index.css";
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
      dataSource={contactsMapper(contacts)}
      columns={columns}
      tableLayout="fixed"
      pagination={{ showSizeChanger: false }}
      scroll={{ y: "75vh" }}
    />
  );
};

export default ContactsTable;

//  const getColumnSearchProps = dataIndex => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//       <div style={{ padding: 8 }}>
//         <Input
//           ref={node => {
//             this.searchInput = node;
//           }}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{ width: 188, marginBottom: 8, display: 'block' }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
//             Reset
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
//     onFilter: (value, record) =>
//       record[dataIndex]
//         ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
//         : '',
//     onFilterDropdownVisibleChange: visible => {
//       if (visible) {
//         setTimeout(() => this.searchInput.select(), 100);
//       }
//     },
//     render: text =>
//       this.state.searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//           searchWords={[this.state.searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ''}
//         />
//       ) : (
//         text
//       ),
//   });

//   handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     this.setState({
//       searchText: selectedKeys[0],
//       searchedColumn: dataIndex,
//     });
//   };

//   handleReset = clearFilters => {
//     clearFilters();
//     this.setState({ searchText: '' });
//   };

//   render() {
//     const columns = [
//       {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//         width: '30%',
//         ...this.getColumnSearchProps('name'),
//       },
//       {
//         title: 'Age',
//         dataIndex: 'age',
//         key: 'age',
//         width: '20%',
//         ...this.getColumnSearchProps('age'),
//       },
//       {
//         title: 'Address',
//         dataIndex: 'address',
//         key: 'address',
//         ...this.getColumnSearchProps('address'),
//       },
//     ];
//     return <Table columns={columns} dataSource={data} />;
//   }
// }

// ReactDOM.render(<App />, mountNode);
