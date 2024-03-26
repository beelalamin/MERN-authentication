import { useState } from "react";
import { ClipLoader } from "react-spinners";

export const Loader = ({ loading }) => {
  const override = {
    display: "block",
    marginTop: "5px",
  };
  return (
    <ClipLoader
      color="#ffffff"
      loading={loading}
      cssOverride={override}
      size={15}
    />
  );
};

export default Loader;
