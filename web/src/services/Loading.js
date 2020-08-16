import React from "react";
import Spin from "antd/es/spin";

import "antd/es/spin/style/index.css";

export default function Loading(props) {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
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
  } else {
    return null;
  }
}
