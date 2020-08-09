import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import VCard from "vcf";
import Button from "antd/es/button";
import UploadOutlined from "@ant-design/icons/es/icons/UploadOutlined";

import "antd/es/button/style/index.css";

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
  const uploadClick = useCallback(() => uploadInput.current.click(), []);
  const onUpload = useCallback(
    async ({ target: { files: [file] = [] } = {} }) => {
      if (file) {
        const content = await readFile(file);
        var cards = VCard.parse(content);
        //const card = new VCard().parse(content);
        console.log(
          "AA",
          cards.filter(({ data: { tel } }) => tel)
        );
      }
    },
    []
  );

  return (
    <>
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
      <p>
        <Link to="/product">Product</Link>
      </p>
    </>
  );
};
export default Home;
