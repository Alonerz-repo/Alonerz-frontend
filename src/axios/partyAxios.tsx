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
  address1: string;
  address2: string;
  placeName: string;
  createdAt: string;
  updateAt: string;
  host: userInfo;
  guests: userInfo[];
}

const url = `http://localhost:5000`;

export const partyAxios = {
  createParty: async (group: Partial<GroupInfo>) => {
    try {
      const cookie = getCookie("accessToken");
      await axios({
        method: "post",
        url: `${url}/api/groups`,
        headers: {
          Athorization: `Bearer ${cookie}`,
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
        method: "post",
        url: `${url}/api/groups`,
        data: {
          groupId,
        },
      });
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
      address1: "",
      address2: "",
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
