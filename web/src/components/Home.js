import React, { useState, useCallback } from "react";
import Layout from "antd/es/layout";
import Space from "antd/es/space";
import Input from "antd/es/input";

import ContactsTable from "./ContactsTable";
import ImportContacts from "./ImportContacts";

const { Header, Content } = Layout;
const { Search } = Input;

import "antd/es/layout/style/index.css";
import "antd/es/space/style/index.css";
import "antd/es/input/style/index.css";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFiltered] = useState([]);

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
        </Space>
      </Header>

      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <ContactsTable contacts={filteredContacts} />
      </Content>
    </Layout>
  );
};

export default Home;
