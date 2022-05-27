import React from "react";
import styled from "styled-components";
import Category from "../assets/category";
import Header from "../assets/header";
import { DDayCalculator } from "../utils/tools/calculator";

type Props = {
  title: string;
  address: string;
  startAt?: Date;
  endAt?: Date;
  isFlex?: boolean;
  limit: Number;
  headcount: Number;
  _onClick?(): void;
  src?: string;
  menu?: string;
  categoryId: number;
};

const styledNum = styled.div``;

const Card = ({
  title,
  address,
  startAt,
  endAt,
  isFlex,
  limit,
  headcount,
  _onClick,
  src,
  menu,
  categoryId,
}: Props) => {
  const findCategory = Category.findById(categoryId);
  const icon = Header.findById(1);

  if (isFlex) {
    const time = `${new Date(startAt ?? "").getHours()}:${new Date(
      startAt ?? ""
    ).getMinutes()} ~ ${new Date(endAt ?? "").getHours()}:${new Date(
      startAt ?? ""
    ).getMinutes()}`;
    const adres = address.split(" ");
    const place = `${adres[0] ?? ""} ${adres[1] ?? ""} ${adres[2] ?? ""}`;
    return (
      <React.Fragment>
        <BackgroundImage isFlex onClick={_onClick} src={src}>
          <Abled categoryId={findCategory?.image} />
          {startAt !== undefined ? (
            <div
              style={{
                position: "absolute",
                bottom: "75px",
                margin: "0px 0px 0px 11px",
                background: "#FBB631",
                borderRadius: "15px",
                fontSize: "12px",
                padding: "3px 8px",
              }}
            >
              {DDayCalculator(startAt)}
            </div>
          ) : (
            <></>
          )}
          <PartyInfo isFlex>
            <div style={{ fontWeight: "bold" }}>{title}</div>
            <div>{menu}</div>
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <img
                style={{ width: "13px", height: "13px" }}
                src={Header.rows[6].image}
                alt=""
              />
              {place}
            </div>
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <img
                style={{ width: "13px", height: "13px" }}
                src={Header.rows[7].image}
                alt=""
              />
              {time}
            </div>
          </PartyInfo>

          <PartyHeadcount>
            <img
              style={{ width: "13px", height: "13px" }}
              src={Header.rows[8].image}
              alt=""
            />

            {headcount}

            <div style={{ color: "#9E9E9E" }}>
              <>/ {limit}</>
            </div>
          </PartyHeadcount>
        </BackgroundImage>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <BackgroundImage onClick={_onClick} src={src}>
        <PartyInfo>
          <div>{title}</div>
          <div>{`${address} | ${startAt?.getHours()}:00 ~ ${endAt?.getHours()}:00`}</div>
        </PartyInfo>
        <PartyHeadcount>
          {headcount} / {limit}
        </PartyHeadcount>
      </BackgroundImage>
    </React.Fragment>
  );
};

interface BackgroundImageProps {
  isFlex?: boolean;
  src?: string;
}

interface PartyHeadcountProps {
  children?: any;
}

interface PartyInfoProps {
  children?: any;
  isFlex?: boolean;
}

interface AbledProps {
  categoryId: string | undefined;
}

const Abled = styled.div<AbledProps>`
  width: 33px;
  height: 33px;
  top: -7px;
  left: -7px;
  border-radius: 33px;
  position: inherit;
  ${(props) =>
    props.categoryId
      ? `background: #fff url('${props.categoryId}') no-repeat center/100%;`
      : "background: #fff;"}
`;

const BackgroundImage = styled.div<BackgroundImageProps>`
  position: relative;

  border-radius: 15px;
  width: ${(props) => (props.isFlex ? "48%" : "100%")};
  height: ${(props) => (props.isFlex ? "222px" : "130px")};
  background-image: ${(props) =>
    props.src
      ? `linear-gradient(180deg, rgba(0, 0, 0, 0) 48.96%, rgb(0, 0, 0) 100%), url("${props.src}");`
      : `linear-gradient(0deg, rgba(110,110,110,1) 0%, rgba(255,255,255,0) 60%), url("${props.src}");`};
  /* background: ${(props) =>
    props.isFlex
      ? "linear-gradient(180deg, rgba(0, 0, 0, 0) 48.96%, rgba(0, 0, 0, 0.35) 100%)"
      : "linear-gradient(0deg, rgba(110,110,110,1) 0%, rgba(255,255,255,0) 60%)"}; */
  color: white;
  background-position: center;
  background-size: cover;
  margin-bottom: 10px;
  cursor: pointer;
`;

const PartyInfo = styled.div<PartyInfoProps>`
  position: inherit;
  top: ${(props) => (props.isFlex ? "120px" : "75px")};
  left: ${(props) => (props.isFlex ? "" : "10px")};
  margin: 0px 0px 0px 11px;
`;
const PartyHeadcount = styled.div<PartyHeadcountProps>`
  position: absolute;
  border-radius: 15px;
  padding: 3px 4px;
  background: #424242;
  right: 10px;
  top: 10px;
  text-align: center;
  display: flex;
  align-items: center;
`;
export default Card;
