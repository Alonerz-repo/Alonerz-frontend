import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import partyAxios, { GroupInfo, initialState } from "../axios/partyAxios";

// 파티 상세정보를 받아와 return해주는 훅
const useGetparty = (groupId: string | undefined) => {
  const navigate = useNavigate();
  const [group, setGroup] = useState<GroupInfo>(initialState);
  // 상황에 따른 예외 처리
  // 401 - 로그인
  // 404 - 조회 실패
  useEffect(() => {
    const t = async () => {
      if (groupId && groupId !== "-1") {
        const data = await partyAxios.getPartyInfo(groupId);
        switch (data.statusCode) {
          case 401:
            alert(data.message);
            return navigate("/login");
          case 404:
            alert(data.message);
            return navigate(-1);
          default:
            setGroup(data);
        }
      }
    };
    t();
  }, []);
  return group;
};
export default useGetparty;
