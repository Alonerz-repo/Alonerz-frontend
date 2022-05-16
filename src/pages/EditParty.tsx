import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { partyAxios, GroupInfo } from "../axios/partyAxios";
import Create from "../components/Create";

const EditParty = () => {
  const groupId = useParams().groupId;
  const [group, setGroup] = React.useState<GroupInfo>(
    partyAxios.initialState.group
  );

  useEffect(() => {
    if (groupId) {
      const getGroup = async () => {
        setGroup(await partyAxios.getPartyInfo(parseInt(groupId)));
      };
      getGroup();
    }
  }, []);

  return <Create group={group}></Create>;
};

export default EditParty;
