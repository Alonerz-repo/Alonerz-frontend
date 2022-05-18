import { useState, useEffect } from "react";
import partyAxios, { GroupInfo, initialState } from "../axios/partyAxios";

// 파티 상세정보를 받아와 return해주는 훅
const useGetparty = (groupId: string | undefined) => {
  const [group, setGroup] = useState<GroupInfo>(initialState);
  useEffect(() => {
    const t = async () => {
      try {
        if (groupId) {
          setGroup(await partyAxios.getPartyInfo(groupId));
        }
      } catch (err) {
        console.log(err);
      }
    };
    t();
  }, []);
  return group;
};
export default useGetparty;
