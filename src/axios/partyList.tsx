import axios from "axios";
import { getCookie } from "../utils/cookie";

const url = process.env.REACT_APP_API_URL;

interface GroupInfo {
  title: string;
  limit: number;
  headcount: number;
  address: string;
  startAt: Date;
  endAt: Date;
  imageUrl: string;
}

export const initialState: GroupInfo[] = [
  {
    title: "aa",
    limit: 3,
    headcount: 2,
    address: "my home",
    startAt: new Date(),
    endAt: new Date(),
    imageUrl:
      "https://github.com/choewy/react-place-app/blob/master/src/images/0.png?raw=true",
  },
];

const partyList = {
  getPartyList: async () => {
    try {
      const token = getCookie("accessToken");
      const response = await axios({
        method: "get",
        url: `${url}/api/groups/today`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.groups);
      return response.data.groups;
    } catch (err) {
      console.log(err);
    }
  },
};

export default partyList;
