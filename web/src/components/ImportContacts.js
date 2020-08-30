import React, { useRef, useEffect, useCallback } from "react";
import Button from "antd/es/button";
import UploadOutlined from "@ant-design/icons/es/icons/UploadOutlined";
import { vCardMapper } from "./contacts.helper";

import "antd/es/button/style/index.css";

let VCard;

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(null);
    reader.readAsText(file, "utf-8");
  });
};

const ImportContacts = ({ onImport }) => {
  const uploadInput = useRef(null);
  const uploadClick = useCallback(() => uploadInput.current.click(), []);
  const onUpload = useCallback(
    async ({ target: { files: [file] = [] } = {} }) => {
      if (file && VCard) {
        const content = await readFile(file);
        var cards = VCard.parse(content);
        onImport(vCardMapper(cards.filter(({ data: { tel } }) => tel)));
      }
    },
    [onImport]
  );

  useEffect(() => {
    (async () => {
      const { default: mod } = await import("vcf");
      VCard = mod;
    })();
  }, []);

  return (
    <>
      <Button onClick={uploadClick}>
        <UploadOutlined /> Import contacts
      </Button>
      <input
        type="file"
        accept=".vcf"
        onChange={onUpload}
        ref={uploadInput}
        style={{ display: "none" }}
      />
    </>
  );
};

export default ImportContacts;
