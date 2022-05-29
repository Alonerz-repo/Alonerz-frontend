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

const filteredGroups = (groups: SelectGroup[], filterValue: number) => {
  const now = new Date().getTime();
  switch (filterValue) {
    case 1:
      return groups.filter((group) => {
        const startTime = new Date(group.startAt).getTime();
        return startTime > now;
      });
    case 2:
      return groups.filter((group) => {
        const startTime = new Date(group.startAt).getTime();
        const endTime = new Date(group.endAt).getTime();
        return startTime <= now && endTime >= now;
      });
    case 3:
      return groups.filter((group) => {
        const endTime = new Date(group.endAt).getTime();
        return endTime < now;
      });
    default:
      return groups;
  }
};

const GroupListPage = () => {
  const navigate = useNavigate();
  const { userId } = useAppSelector((state) => state.user);
  const { time } = useParams();
  const [groups, setGroups] = useState<SelectGroup[]>([]);
  const [filter, setFilter] = useState<number>(0);

  const getCurrentLocation = useCallback(() => {
    const { geolocation } = navigator;
    const current = { ...initCurrentLocation };
    if (geolocation) {
      geolocation.getCurrentPosition((pos) => {
        current.x = pos.coords.latitude;
        current.y = pos.coords.longitude;
      });
    }
    return current;
  }, []);

  const getGroups = useCallback(
    async (current: CurrentLocation, filter: number) => {
      const { x, y } = current;
      const { param } = times.find((item) => item.key === time) as Time;
      const groups = await groupAxios.getGroups(x, y, param);
      setGroups(filteredGroups(groups, filter));
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
    const current = getCurrentLocation();
    getGroups(current, filter);
    return () => {};
  }, [time, filter, getCurrentLocation, getGroups]);

  const onTimeOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;
    return navigate(`/groups/${value}`);
  };

  const onFilterOptionChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const {
      target: { value },
    } = e;
    const filterValue = Number(value);
    setFilter(filterValue);
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
        <Style.GroupOrderFilter value={filter} onChange={onFilterOptionChange}>
          <option value={0}>전체</option>
          <option value={1}>참여가능</option>
          <option value={2}>진행중</option>
          <option value={3}>종료</option>
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
