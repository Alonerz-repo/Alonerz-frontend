import { useParams } from "react-router-dom";
import Create from "../components/Create";
import useGetparty from "../useCustom/useGetparty";
import { CreateForm } from "../axios/partyAxios";
import { transformEditPage } from "../utils/transformData";

const EditParty = () => {
  const { groupId } = useParams();
  const group = useGetparty(groupId);

  const customGroup = transformEditPage(group);

  return (
    <Create
      group={customGroup}
      groupId={groupId}
      imageUrl={group.imageUrl}
    ></Create>
  );
};

export default EditParty;
