import React from "react";
import { Image } from "../elements";
import { setImage } from "../store/slices/imageSlice";
import { useAppDispatch, useAppSelector } from "../store/config";
import baseFile from "../assets/fileUpload.png";

const Upload = () => {
  const dispatch = useAppDispatch();
  const image = useAppSelector((state) => state.image.image);
  const selectFile = (e: any) => {
    const reader = new FileReader();
    const file: File = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(setImage(reader.result));
    };
  };

  return (
    <React.Fragment>
      <input type="file" onChange={selectFile} style={{ marginTop: "20px" }} />
      {image ? (
        <Image shape="rectangle" src={image}></Image>
      ) : (
        <Image shape="rectangle" src={baseFile} size="64px" tmpFile></Image>
      )}
    </React.Fragment>
  );
};

export default Upload;
