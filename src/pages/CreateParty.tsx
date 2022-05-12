import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { partyAxios, GroupInfo } from "../axios/partyAxios";
import Create from "../components/Create";

const CreateParty = () => {
  const groupId = useParams().groupId;
  const [group, setGroup] = React.useState<GroupInfo>(
    partyAxios.initialState.group
  );

  useEffect(() => {
    if (groupId !== undefined) {
      const getGroup = async () => {
        setGroup(await partyAxios.getPartyInfo(parseInt(groupId)));
      };
      getGroup();
    }
  }, []);

  if (groupId !== undefined && group.groupId !== -1) {
    return <Create group={group}></Create>;
  } else {
    return <Create group={partyAxios.initialState.group}></Create>;
  }
};

export default CreateParty;
