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

  React.useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl]);

  return (
    <Grid {...styles}>
      <input
        type="file"
        onChange={selectFile}
        style={{ marginTop: "20px" }}
        {...inputProps}
      />
      {image ? <Image shape="rectangle" src={image.toString()}></Image> : null}
    </Grid>
  );
};

export default UploadForm;
