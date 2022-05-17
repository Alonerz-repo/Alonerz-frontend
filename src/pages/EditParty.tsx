import { useParams } from "react-router-dom";
import Create from "../components/Create";
import useGetparty from "../useCustom/useGetparty";

const EditParty = () => {
  const { groupId } = useParams();
  const group = useGetparty(groupId);
  return <Create group={group}></Create>;
};

export default EditParty;
