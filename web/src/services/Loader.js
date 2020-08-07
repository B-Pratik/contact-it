import React from "react";
import loadable from "@loadable/component";
import Spin from "antd/es/spin";

import "antd/es/spin/style/index.css";

const loader = (name) =>
  loadable(() => import(`../components/${name}`), {
    fallback: (
      <Spin size="large">
        <div
          style={{
            height: "100vh",
            width: "100vw",
          }}
        />
      </Spin>
    ),
  });

export default loader;
