import React from "react";
import { Image } from "../elements";
import baseFile from "../assets/fileUpload.png";

interface UploadProps {
  handleImageUrl: any;
  imageUrl?: any;
}

const Upload = ({ handleImageUrl, imageUrl }: UploadProps) => {
  type fileType = string | ArrayBuffer | null;
  const [image, setImage] = React.useState<fileType>("");
  const selectFile = (e: any) => {
    const reader = new FileReader();
    const file: File = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    handleImageUrl(file);
  };

  React.useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl]);

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
