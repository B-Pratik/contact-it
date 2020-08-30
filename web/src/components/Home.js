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
import { contactMapper } from "./contacts.helper";

let contacts = [];
let currentSearch = "";

const Home = () => {
  const [filteredContacts, setFiltered] = useState([]);
  const [isDrawerVisible, setDrawerVisibility] = useState(false);

  const doSearch = useCallback(() => {
    if (currentSearch && currentSearch.trim().length > 0) {
      const filtered = contacts.filter((contact) =>
        Object.values(contact).some(
          (val) =>
            val &&
            val.toString().toLowerCase().includes(currentSearch.toLowerCase())
        )
      );
      setFiltered(filtered);
    } else {
      setFiltered([...contacts]);
    }
  }, []);

  const onImport = useCallback(
    (_contacts) => {
      contacts = _contacts;
      doSearch();
    },
    [doSearch]
  );

  const onAddContact = useCallback(
    (contact) => {
      contacts.push(contactMapper(contact, contacts.length));
      doSearch();
      setTimeout(() => setDrawerVisibility(false), 100);
    },
    [doSearch]
  );

  const onSearch = useCallback(
    (val = "") => {
      currentSearch = val;
      doSearch();
    },
    [doSearch]
  );

  return (
    <Layout>
      <Header
        className="header"
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
      >
        <Space align="center">
          <ImportContacts onImport={onImport} />
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
          <ContactDrawer
            onClose={setDrawerVisibility.bind(null, false)}
            onAdd={onAddContact}
          />
        )}
        <ContactsTable contacts={filteredContacts} />
      </Content>
    </Layout>
  );
};

export default Home;
