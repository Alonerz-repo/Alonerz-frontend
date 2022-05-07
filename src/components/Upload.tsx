import React, { useSyncExternalStore } from "react";
import { Image } from "../elements";

const Upload = () => {
  const selectFile = (e: any) => {
    const reader = new FileReader();
    const file: File = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
    };
  };

  return (
    <React.Fragment>
      <input type="file" onChange={selectFile} style={{ marginTop: "20px" }} />
      <Image shape="rectangle"></Image>
    </React.Fragment>
  );
};

export default Upload;
