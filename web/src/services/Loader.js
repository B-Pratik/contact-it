import React from "react";
import loadable from "@loadable/component";
import Loading from "./Loading";

const loader = (name) =>
  loadable(() => import(`../components/${name}`), {
    fallback: <Loading />,
  });

export default loader;
