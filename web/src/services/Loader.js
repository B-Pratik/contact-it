import React, { useState, useEffect } from "react";
import Spin from "antd/es/spin";

import "antd/es/spin/style/index.css";

const Home = ({ path }) => {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    import(`../components/${path}`).then(({ default: c }) => setComponent(c));
  }, [path]);

  if (!component) {
    return (
      <Spin size="large">
        <div
          style={{
            height: "100vh",
            width: "100vw",
          }}
        />
      </Spin>
    );
  }
  return component;
};
export default Home;
