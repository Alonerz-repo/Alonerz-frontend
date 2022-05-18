import axios from "axios";
import { errorHandler, getHeaders, getUrl } from "../utils/api";

interface GroupInfo {
  title: string;
  limit: number;
  headcount: number;
  address: string;
  startAt: Date;
  endAt: Date;
  imageUrl: string;
}

type time = string | undefined;

// 파티 리스트의 초기 상태값
export const initialState: GroupInfo[] = [
  {
    title: "",
    limit: 3,
    headcount: 2,
    address: "my home",
    startAt: new Date(),
    endAt: new Date(),
    imageUrl:
      "https://github.com/choewy/react-place-app/blob/master/src/images/0.png?raw=true",
  },
];

// 데이터의 최신화를 위해 redux를 사용하지 않고 각 페이지별로 필요한 데이터를 받아옴
const partyList = {
  // 사용자가 오늘 참여중인 파티 목록 요청
  getPartyList: async () => {
    const url = getUrl("/api/groups/today");
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((response) => response.data)
      .catch((error) => error.response.data);
    return data.error ? errorHandler(data) : data.groups;
  },

  // 아침&점심, 저녁&야식의 시간에 따른 파티 목록 요청
  // time : lunch 또는 dinner의 스트링
  getTimeList: async (time: time) => {
    const url = getUrl("/api/groups");
    const headers = getHeaders();
    const body = {
      x: 1,
      y: 1,
      time,
    };
    const data = await axios
      .get(url, { headers, data: body })
      .then((response) => response.data)
      .catch((error) => error.response.data);

    return data.error ? errorHandler(data) : data.groups;
  },
};

export default partyList;
