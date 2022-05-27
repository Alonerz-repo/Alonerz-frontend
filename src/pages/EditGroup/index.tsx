import { useParams } from "react-router-dom";
import Edit from "./Edit";
import useGetparty from "../../useCustom/useGetparty";
import { CreateForm } from "../../axios/partyAxios";
import { transformEditPage } from "../../utils/transformData";

const EditGroup = () => {
  const { groupId } = useParams();
  const group = useGetparty(groupId);

  const customGroup = transformEditPage(group);

  return (
    <Edit
      group={customGroup}
      groupId={groupId}
      imageUrl={group.imageUrl}
    ></Edit>
  );
};

export default EditGroup;
