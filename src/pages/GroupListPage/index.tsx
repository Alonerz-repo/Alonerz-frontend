import React, { useCallback, useEffect, useState } from "react";
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

  const getGroups = useCallback(
    async (current: CurrentLocation) => {
      const { x, y } = current;
      const { param } = times.find((item) => item.key === time) as Time;
      const groups = await groupAxios.getGroups(x, y, param);
      setGroups(groups);
    },
    [time],
  );

  useEffect(() => {
    if (!userId) {
      return navigate("/login");
    }
    return () => {};
  }, [userId, navigate]);

  useEffect(() => {
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
  }, [time, getGroups]);

  const onTimeOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;
    return navigate(`/groups/${value}`);
  };

  const renderTimeFilters = () => {
    return (
      <Style.GroupTimeSelect value={time} onChange={onTimeOptionChange}>
        <option value="all">전체</option>
        <option value="lunch">{"아침 & 점심"}</option>
        <option value="dinner">{"저녁 & 야식"}</option>
      </Style.GroupTimeSelect>
    );
  };

  const renderOrderFilters = () => {
    return (
      <div>
        <Style.GroupOrderFilter>
          <option defaultChecked>정렬</option>
          <option>거리순</option>
          <option>시간순</option>
        </Style.GroupOrderFilter>
      </div>
    );
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
      <Header text="모집중인 파티" type="user" />
      <Style.GroupToolsWrapper>
        {renderTimeFilters()}
        {renderOrderFilters()}
      </Style.GroupToolsWrapper>
      <Style.GroupListWrapper>{renderGroups()}</Style.GroupListWrapper>
    </>
  );
};

export default GroupListPage;
