import { useParams, useNavigate } from "react-router-dom";
import Create from "./Create";

const CreateGroup = () => {
  const { option } = useParams();

  if (option !== undefined && option === "dinner") {
    return <Create time={17}></Create>;
  }
  return <Create time={9}></Create>;
};

export default CreateGroup;
