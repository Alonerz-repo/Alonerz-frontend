import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/config";
import {
  getPartyInfo,
  initialState,
  setGroup,
} from "../store/slices/partyInfoSlice";
import Create from "../components/Create";

const CreateParty = () => {
  const dispatch = useAppDispatch();
  const groupId = useParams().groupId;
  React.useLayoutEffect(() => {
    if (groupId !== undefined) {
      const getParty = async () => {
        dispatch(getPartyInfo(parseInt(groupId)));
      };
      getParty();
    } else {
      const setParty = async () => {
        dispatch(setGroup(initialState.group));
      };
      setParty();
    }
  });

  return <Create></Create>;
};

export default CreateParty;
