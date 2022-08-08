import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Loader = () => {
  return <BeatLoader loading={true} size={20} speedMultiplier={1} />;
};

export default Loader;
