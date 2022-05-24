/* 작성자 : 최원영 */

import axios from 'axios';
import { getHeaders, getUrl } from '../utils/api';

export interface GroupUser {
  userId: string;
  nickname: string;
  profileImageUrl: string;
  characterImageId: number;
  careerId: number;
  yearId: number;
  description: string;
}

export interface Group {
  groupId: string;
  title: string;
  categoryId: number;
  imageUrl: string | null;
  description: string;
  startAt: Date;
  endAt: Date;
  limit: number;
  locationX: number;
  locationY: number;
  address: string;
  placeName: string;
  createdAt: string;
  updatedAt: string;
  host: GroupUser;
  guests: GroupUser[];
}

export const groupException = {
  getOneByGroupId: (err: any) => {
    const { error } = err;
    throw new Error(error);
  },
};

export const groupAxios = {
  getOneByGroupId: async (groupId: string): Promise<Group> => {
    const url = getUrl(`/api/groups/${groupId}`);
    const headers = getHeaders();
    let group = null;
    try {
      const { data } = await axios.get(url, { headers });
      group = data;
    } catch (error) {
      groupException.getOneByGroupId(error);
    }
    return group;
  },
};
