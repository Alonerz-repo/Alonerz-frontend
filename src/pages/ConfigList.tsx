import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Grid, Text } from "../elements";
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router-dom";

const margin = "20px";

export interface ConfigItem {
  label: string;
  onClick(navigate: NavigateFunction): React.MouseEventHandler<HTMLDivElement>;
}

const configItems = [
  {
    label: "내정보 수정",
    onClick: (navigate: NavigateFunction) => () => navigate("edit"),
  },
  {
    label: "내정보",
    onClick: (navigate: NavigateFunction) => () => navigate("/"),
  },
  {
    label: "푸시알림",
    onClick: (navigate: NavigateFunction) => () => navigate("/"),
  },
  {
    label: "리뷰관리",
    onClick: (navigate: NavigateFunction) => () => navigate("/"),
  },
  {
    label: "차단목록",
    onClick: (navigate: NavigateFunction) => () => navigate("blocklist"),
  },
  {
    label: "공지사항",
    onClick: (navigate: NavigateFunction) => () => navigate("/"),
  },
  {
    label: "버전정보",
    onClick: (navigate: NavigateFunction) => () => navigate("/"),
  },
];

const Position = styled.div`
  padding: 20px 20px 0px 20px;
`;

const Line = styled.div`
  border: 1px solid #757575;
`;

const ConfigList = () => {
  const navigate = useNavigate();
  const renderConfigItems = () => {
    return configItems.map((item: ConfigItem, key: number) => {
      const { label, onClick } = item;
      const positionProps = { key, onClick: onClick(navigate) };
      return (
        <Position {...positionProps}>
          <Text margin={margin}>{label}</Text>
          <Line />
        </Position>
      );
    });
  };

  return (
    <React.Fragment>
      <Header text="설정" />
      <Grid>{renderConfigItems()}</Grid>
    </React.Fragment>
  );
};

export default ConfigList;
