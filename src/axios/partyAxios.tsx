import axios from "axios";
import { errorHandler, getHeaders, getUrl } from "../utils/api";

interface userInfo {
  userId: string;
  nickname: string;
  image?: any;
  imageUrl?: string;
  year: string;
  description: string;
}

interface G {
  groupId?: string;
  title: string;
  menu: string;
  image?: any;
  description: string;
  startAt: Date;
  endAt: Date;
  limit: number;
  locationX: number;
  locationY: number;
  address: string;
  placeName: string;
  createdAt: string;
  updateAt: string;
  host: userInfo;
  guests: userInfo[];
}
export interface GroupInfo extends G {
  imageUrl: string;
}

export interface CreateGroupInfo extends G {
  imageUrl: any;
}

export const initialState: GroupInfo = {
  groupId: "",
  title: "",
  menu: "",
  description: "",
  startAt: new Date(),
  endAt: new Date(),
  limit: 4,
  image: null,
  imageUrl: "",
  locationX: 33.450701,
  locationY: 126.570667,
  address: "",
  placeName: "",
  createdAt: "",
  updateAt: "",
  host: {
    userId: "",
    nickname: "",
    image: null,
    imageUrl: "",
    year: "",
    description: "",
  },
  guests: [
    {
      userId: "",
      nickname: "",
      image: null,
      imageUrl: "",
      year: "",
      description: "",
    },
  ],
};

export type Group = Partial<GroupInfo>;

export const partyAxios = {
  createParty: async (group: any) => {
    const formData = new FormData();

    Object.keys(group).forEach((key) => {
      formData.append(key, group[key]);
    });

    const url = getUrl(`/api/groups`);
    const auth = getHeaders();
    const headers = {
      ...auth,
      "Content-Type": "multipart/form-data",
    };
    const body = { ...group };
    const data = await axios
      .post(url, body, { headers })
      .then((response) => response.data)
      .catch((error) => error.response.data);

    return data.error ? errorHandler(data) : data;
  },

  editParty: async (group: any, groupId: string) => {
    const url = getUrl(`/api/groups/${groupId}`);

    const formData = new FormData();

    Object.keys(group).forEach((key) => {
      formData.append(key, group[key]);
    });
    const auth = getHeaders();
    const headers = {
      ...auth,
      "Content-Type": "multipart/form-data",
    };
    const body = { ...group };
    const data = await axios
      .patch(url, body, { headers })
      .then((response) => response.data)
      .catch((error) => error.response.data);

    return data.error ? errorHandler(data) : data;
  },

  deleteParty: async (groupId: string) => {
    const url = getUrl(`/api/groups/${groupId}`);
    const headers = getHeaders();
    const data = await axios
      .delete(url, { headers, data: { groupId } })
      .then((response) => response.data)
      .catch((error) => error.response.data);
    console.log(data);
    return data.error ? errorHandler(data) : data;
  },

  getPartyInfo: async (groupId: string) => {
    const url = getUrl(`/api/groups/${groupId}`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((response) => response.data)
      .catch((error) => error.response.data);

    return data.error ? errorHandler(data) : data.group;
  },

  getJoinedParty: async (userId: any) => {
    const url = getUrl(`/api/groups/joined/${userId}`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => {
        return res;
      })
      .catch((err) => err.response.data);
    return data.err ? errorHandler(data) : data;
  },

  joinParty: async (groupId: string, action: string) => {
    const url = getUrl(`/api/groups/${groupId}`);
    const headers = getHeaders();
    console.log(groupId, action);
    const data = await axios
      .put(url, { headers, data: { groupId, action } })
      .then((res) => {
        return res;
      })
      .catch((err) => err.response.data);
    return data.err ? errorHandler(data) : data;
  },
};

export default partyAxios;
