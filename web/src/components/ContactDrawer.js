import React, { useEffect, useRef } from "react";
import Drawer from "antd/es/drawer";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Row from "antd/es/row";
import Checkbox from "antd/es/checkbox";
import Col from "antd/es/col";
import Button from "antd/es/button";
import PlusCircleOutlined from "@ant-design/icons/es/icons/PlusCircleOutlined";
import MinusCircleOutlined from "@ant-design/icons/es/icons/MinusCircleOutlined";

import "antd/es/drawer/style/index.css";
import "antd/es/form/style/index.css";
import "antd/es/input/style/index.css";
import "antd/es/grid/style/index.css";
import "antd/es/checkbox/style/index.css";
import "antd/es/button/style/index.css";

const FormList = ({ type, notRequired = false, id = type }) => {
  const addRef = useRef(null);
  const title = type.replace(/^\w/, (c) => c.toUpperCase());

  useEffect(() => {
    addRef.current();
  }, []);

  return (
    <Form.List name={id}>
      {(fields, { add, remove }) => {
        addRef.current = add;
        return (
          <>
            {fields.map((field, index) => (
              <Row
                key={index}
                gutter={16}
                align={index === 0 ? "middle" : "top"}
              >
                <Col span={20}>
                  <Form.Item
                    {...field}
                    label={index === 0 ? title : ""}
                    name={[field.name, id]}
                    fieldKey={[field.fieldKey, id]}
                    rules={
                      notRequired
                        ? []
                        : [{ required: true, message: `Please enter ${type}` }]
                    }
                  >
                    <Input placeholder={`Please enter ${type}`} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  {index === 0 && (
                    <PlusCircleOutlined
                      onClick={() => {
                        add();
                      }}
                    />
                  )}
                  {index !== 0 && (
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  )}
                </Col>
              </Row>
            ))}
          </>
        );
      }}
    </Form.List>
  );
};

const ContactDrawer = ({ onClose, onAdd }) => (
  <Drawer
    visible
    destroyOnClose
    title="Add new contact"
    width={500}
    onClose={onClose}
  >
    <Form layout="vertical" requiredMark={false} onFinish={onAdd}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="fn"
            label="Name"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Input placeholder="Please enter user name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <FormList type="number" id="tel" />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <FormList type="email" notRequired />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="relation" label="Relation">
            <Checkbox.Group>
              <Checkbox value="relative" style={{ padding: "0 10px 10px 0" }}>
                Relative
              </Checkbox>
              <Checkbox value="friend" style={{ padding: "0 10px 10px 0" }}>
                Friend
              </Checkbox>
              <Checkbox value="other" style={{ padding: "0 10px 10px 0" }}>
                Other
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="adr" label="Address">
            <Input.TextArea
              rows={4}
              allowClear
              autoSize={{ minRows: 4, maxRows: 7 }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={3}>
          <Button onClick={onClose}>Cancel</Button>
        </Col>
        <Col span={3} offset={3}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Drawer>
);

export default ContactDrawer;
