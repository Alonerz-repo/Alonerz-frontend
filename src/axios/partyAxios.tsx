import axios from "axios";
import { getCookie } from "../utils/cookie";

interface userInfo {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}
export interface GroupInfo {
  groupId?: number;
  title: string;
  menu: string;
  description: string;
  startAt: Date;
  endAt: Date;
  limit: number;
  imageUrl: string;
  locationX: number;
  locationY: number;
  address: string;
  placeName: string;
  createdAt: string;
  updateAt: string;
  host: userInfo;
  guests: userInfo[];
}

const token = getCookie("accessToken");
const url = `http://localhost:5000`;

export const partyAxios = {
  createParty: async (group: Partial<GroupInfo>) => {
    try {
      await axios({
        method: "post",
        url: `${url}/api/groups`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          ...group,
        },
      }).then((res) => {
        console.log(res.status);
        console.log(res.data);
      });
    } catch (err: any) {
      console.log(err);
    }
  },

  editParty: async (group: Partial<GroupInfo>, groupId: number) => {
    try {
      await axios({
        method: "patch",
        url: `${url}/api/groups${groupId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          ...group,
        },
      }).then((res) => {
        console.log(res.status);
        console.log(res.data);
      });
    } catch (err: any) {
      console.log(err);
    }
  },

  getPartyInfo: async (groupId: number) => {
    try {
      const result = await axios({
        method: "get",
        url: `${url}/api/groups/${groupId}`,
        data: {
          userId: 1,
          groupId,
        },
      });
      console.log(result.data.group);
      console.log(new Date(Date.parse(result.data.group.endAt)));
      return result.data.group;
    } catch (err: any) {
      console.log(err.message);
    }
  },

  initialState: {
    group: {
      groupId: -1,
      title: "",
      menu: "",
      description: "",
      startAt: new Date(),
      endAt: new Date(),
      limit: 4,
      imageUrl: "",
      locationX: 33.450701,
      locationY: 126.570667,
      address: "",
      placeName: "",
      createdAt: "",
      updateAt: "",
      host: {
        userId: 0,
        nickname: "",
        profileImageUrl: "",
      },
      guests: [
        {
          userId: 0,
          nickname: "",
          profileImageUrl: "",
        },
      ],
    },
  },
};
export default partyAxios;
