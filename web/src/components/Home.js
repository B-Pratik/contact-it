import React, { useState, useCallback } from "react";
import Layout from "antd/es/layout";
import Space from "antd/es/space";
import Input from "antd/es/input";
import Button from "antd/es/button";
import PlusOutlined from "@ant-design/icons/es/icons/PlusOutlined";

import ContactsTable from "./ContactsTable";
import ImportContacts from "./ImportContacts";
import ContactDrawer from "./ContactDrawer";

const { Header, Content } = Layout;
const { Search } = Input;

import "antd/es/layout/style/index.css";
import "antd/es/space/style/index.css";
import "antd/es/input/style/index.css";
import "antd/es/button/style/index.css";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFiltered] = useState([]);
  const [isDrawerVisible, setDrawerVisibility] = useState(false);

  const onSearch = useCallback(
    (value = "") => {
      if (value.trim().length > 0) {
        const filtered = contacts.filter((contact) =>
          Object.values(contact).some(
            (val) =>
              val && val.toString().toLowerCase().includes(value.toLowerCase())
          )
        );
        setFiltered(filtered);
      } else {
        setFiltered(contacts);
      }
    },
    [contacts]
  );

  return (
    <Layout>
      <Header
        className="header"
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
      >
        <Space align="center">
          <ImportContacts
            onImport={(imported) => {
              setContacts(imported);
              setFiltered(imported);
            }}
          />
          <Search
            placeholder="search"
            onSearch={onSearch}
            style={{ width: 200 }}
            disabled={contacts.length === 0}
            allowClear
          />
          <Button type="primary" onClick={setDrawerVisibility.bind(null, true)}>
            <PlusOutlined /> Add Contact
          </Button>
        </Space>
      </Header>

      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        {isDrawerVisible && (
          <ContactDrawer onClose={setDrawerVisibility.bind(null, false)} />
        )}
        <ContactsTable contacts={filteredContacts} />
      </Content>
    </Layout>
  );
};

export default Home;
