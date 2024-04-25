import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "HmmM",
  description = "This is the Chat App called HmmM",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
