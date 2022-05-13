import axios from 'axios';
import { errorHandler, getHeaders, getUrl } from '../utils/api';

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

// 최원영
export type Group = Partial<GroupInfo>;

export const partyAxios = {
  // 최원영
  createParty: async (group: Group) => {
    const url = getUrl(`/api/groups`);
    const headers = getHeaders();
    const body = { ...group };
    const data = await axios
      .post(url, body, { headers })
      .then((response) => response.data)
      .catch((error) => error.response.data);

    return data.error ? errorHandler(data) : data;
  },

  // 최원영
  editParty: async (group: Group, groupId: number) => {
    const url = getUrl(`/api/groups/${groupId}`);
    const headers = getHeaders();
    const body = { ...group };
    const data = await axios
      .patch(url, body, { headers })
      .then((response) => response.data)
      .catch((error) => error.response.data);

    return data.error ? errorHandler(data) : data;
  },

  // 최원영
  getPartyInfo: async (groupId: number) => {
    const url = getUrl(`/api/groups/${groupId}`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((response) => response.data)
      .catch((error) => error.response.data);

    return data.error ? errorHandler(data) : data.group;
  },

  initialState: {
    group: {
      groupId: -1,
      title: '',
      menu: '',
      description: '',
      startAt: new Date(),
      endAt: new Date(),
      limit: 4,
      imageUrl: '',
      locationX: 33.450701,
      locationY: 126.570667,
      address: '',
      placeName: '',
      createdAt: '',
      updateAt: '',
      host: {
        userId: 0,
        nickname: '',
        profileImageUrl: '',
      },
      guests: [
        {
          userId: 0,
          nickname: '',
          profileImageUrl: '',
        },
      ],
    },
  },
};

export default partyAxios;
