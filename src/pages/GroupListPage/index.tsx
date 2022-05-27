import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { groupAxios, SelectGroup } from "../../axios/groupAxios";
import { useAppSelector } from "../../store/config";
import Header from "../../components/Header";
import GroupCard from "./GroupCard";
import * as Style from "./styled";

interface Time {
  key: string;
  label: string;
  param: string;
}

const times = [
  { key: "all", label: "전체", param: "" },
  { key: "lunch", label: "점심", param: "lunch" },
  { key: "dinner", label: "저녁", param: "dinner" },
];

interface CurrentLocation {
  x: number;
  y: number;
}

const initCurrentLocation = {
  x: 37.56493,
  y: 126.97812,
};

const GroupListPage = () => {
  const navigate = useNavigate();
  const { userId } = useAppSelector((state) => state.user);
  const { time } = useParams();
  const [groups, setGroups] = useState<SelectGroup[]>([]);

  useEffect(() => {
    if (!userId) {
      return navigate("/login");
    }
    return () => {};
  }, [userId, navigate]);

  useEffect(() => {
    const getGroups = async (current: CurrentLocation) => {
      const { x, y } = current;
      const { param } = times.find((item) => item.key === time) as Time;
      const groups = await groupAxios.getGroups(x, y, param);
      setGroups(groups);
    };
    const { geolocation } = navigator;
    const current = { ...initCurrentLocation };
    if (geolocation) {
      geolocation.getCurrentPosition((pos) => {
        current.x = pos.coords.latitude;
        current.y = pos.coords.longitude;
      });
    }
    getGroups(current);
    return () => {};
  }, [time]);

  const renderFilters = () => {
    return <div>filter</div>;
  };

  const renderGroups = () => {
    return (
      <>
        {groups.map((group, index) => {
          const { groupId } = group;
          const groupCardProps = {
            key: `${groupId}-${index}`,
            group,
            navigate,
          };
          return <GroupCard {...groupCardProps} />;
        })}
      </>
    );
  };

  return (
    <>
      <Header text="" />
      <Style.Container>
        {renderFilters()}
        <Style.Wrapper>{renderGroups()}</Style.Wrapper>
      </Style.Container>
    </>
  );
};

export default GroupListPage;
