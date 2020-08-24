import React, { useCallback, useRef, useEffect, useState } from "react";
import Button from "antd/es/button";
import Layout from "antd/es/layout";
import Space from "antd/es/space";
import UploadOutlined from "@ant-design/icons/es/icons/UploadOutlined";
import ContactsTable from "./ContactsTable";

const { Header, Content } = Layout;

import "antd/es/button/style/index.css";
import "antd/es/layout/style/index.css";
import "antd/es/space/style/index.css";

let VCard;

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(null);
    reader.readAsText(file, "utf-8");
  });
};

const Home = () => {
  const uploadInput = useRef(null);
  const [contacts, setContacts] = useState([]);
  const uploadClick = useCallback(() => uploadInput.current.click(), []);

  const onUpload = useCallback(
    async ({ target: { files: [file] = [] } = {} }) => {
      if (file && VCard) {
        const content = await readFile(file);
        var cards = VCard.parse(content);
        setContacts(cards.filter(({ data: { tel } }) => tel));
      }
    },
    []
  );

  useEffect(() => {
    (async () => {
      const { default: mod } = await import("vcf");
      VCard = mod;
    })();
  }, []);

  return (
    <Layout>
      <Header
        className="header"
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
      >
        <Space>
          <Button onClick={uploadClick}>
            <UploadOutlined /> Upload contacts
          </Button>
          <input
            type="file"
            accept=".vcf"
            onChange={onUpload}
            ref={uploadInput}
            style={{ display: "none" }}
          />
        </Space>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <ContactsTable contacts={contacts} />
      </Content>
    </Layout>
  );
};
export default Home;
