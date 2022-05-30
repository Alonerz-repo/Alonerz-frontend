import React from "react";
import styled from "styled-components";
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { CreateForm } from "../../axios/partyAxios";
import times from "../../utils/partyTimes";
import { Grid, Text } from "../../elements";

type Option = {
  name: string;
  value: string | number;
};

interface Props {
  width?: string;
  margin?: string;
  careerId?: any;
  placeholder?: string;
  register: UseFormRegister<CreateForm>;
  getValues: UseFormGetValues<CreateForm>;
  v?: number;
  setValue: UseFormSetValue<CreateForm>;
}

// 컴포넌트
const Select = ({ width, margin, register, setValue, getValues }: Props) => {
  const [start, setStart] = React.useState<number>();
  const styles = {
    width,
    margin,
    cursor: "pointer",
  };

  const randerStartAtOptions = () => {
    return times.openTimes.map((item: Option): any => {
      const { name, value } = item;
      return <option label={name} value={value} key={value}></option>;
    });
  };

  const randerEndAtOptions = (startNumber: number) => {
    return times.closeTimes.map((item: Option): any => {
      const { name, value } = item;
      if (value <= startNumber) {
        return null;
      }
      return (
        <option value={value} key={value}>
          {name}
        </option>
      );
    });
  };

  return (
    <React.Fragment>
      <Grid isFlex>
        <Grid width="40%">
          <Text bold type="line" titleText="오픈시간" margin="5px 0 5px 0" />
          <MySelected
            style={styles}
            {...register("startAt")}
            onChange={(e) => {
              setValue("startAt", Number(e.target.value));
              setStart(Number(e.target.value));
            }}
          >
            {randerStartAtOptions()}
          </MySelected>
        </Grid>

        <Grid width="40%">
          <Text bold type="line" titleText="마감시간" margin="5px 0 5px 0" />
          <MySelected style={styles} {...register("endAt")}>
            {randerEndAtOptions(getValues("startAt"))}
          </MySelected>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

interface MySelectedProps {
  width?: string;
  margin?: string;
}

const MySelected = styled.select<MySelectedProps>`
  /* text-align: center; */
  background: #eeeeee;
  border-radius: 20px;
  border: none;
  outline: 0px;
  width: ${(props) => props.width ?? "100%"};
  margin: ${(props) => props.margin ?? ""};
  height: 44px;
  padding: 0px 20px;
`;

export default Select;
