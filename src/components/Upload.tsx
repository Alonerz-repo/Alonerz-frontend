import React from "react";
import { Image } from "../elements";
import baseFile from "../assets/fileUpload.png";

const Upload = () => {
  type fileType = string | ArrayBuffer | null;
  const [image, setImage] = React.useState<fileType>("");
  const selectFile = (e: any) => {
    const reader = new FileReader();
    const file: File = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <React.Fragment>
      <input type="file" onChange={selectFile} style={{ marginTop: "20px" }} />
      {image ? (
        <Image shape="rectangle" src={image.toString()}></Image>
      ) : (
        <Image shape="rectangle" src={baseFile} size="64px" tmpFile></Image>
      )}
    </React.Fragment>
  );
};

export default Upload;
