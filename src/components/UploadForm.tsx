import React from "react";
import { Image, Grid } from "../elements";
import baseFile from "../assets/fileUpload.png";
import { useController } from "react-hook-form";

interface UploadProps {
  imageUrl?: string;
  control: any;
  name: string;
  margin?: string;
}

type fileType = string | ArrayBuffer | null;

const UploadForm = ({ name, control, imageUrl, margin }: UploadProps) => {
  const styles = { margin };
  const {
    field: { onChange, value, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: false },
    defaultValue: null,
  });

  const [image, setImage] = React.useState<fileType>();
  const selectFile = (e: any) => {
    const reader = new FileReader();
    const file: File = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    onChange(file);
  };

  const uploadFile = () => {
    document.getElementById("upload")?.click();
  };

  React.useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl]);

  return (
    <Grid {...styles}>
      <input
        type="file"
        id="upload"
        onChange={selectFile}
        style={{ marginTop: "20px", display: "none" }}
        {...inputProps}
      />
      {image ? (
        <Image
          shape="rectangle"
          src={image.toString()}
          onClick={uploadFile}
        ></Image>
      ) : (
        <Image
          onClick={uploadFile}
          shape="rectangle"
          src={baseFile}
          size="64px"
          tmpFile
        ></Image>
      )}
    </Grid>
  );
};

export default UploadForm;
