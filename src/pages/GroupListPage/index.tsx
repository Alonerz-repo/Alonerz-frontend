import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { groupAxios, TodayGroup } from "../../axios/groupAxios";
import { useAppSelector } from "../../store/config";

const options = [
  { key: "all", label: "전체" },
  { key: "lunch", label: "점심" },
  { key: "dinner", label: "저녁" },
];

const GroupListPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = React.useState<TodayGroup[]>([]);
  const { userId } = useAppSelector((state) => state.user);
  const { option } = useParams();

  useEffect(() => {
    const getGroups = async () => {
      // await groupAxios.getGroups(options.find((option) => option.key) as string);
    };
  }, []);

  return <div>1</div>;
};

export default GroupListPage;
