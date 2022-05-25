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

export const groupAxios = {
  getOneByGroupId: async (groupId: string): Promise<Group> => {
    const url = getUrl(`/api/groups/${groupId}`);
    const headers = getHeaders();
    let group = null;
    try {
      const { data } = await axios.get(url, { headers });
      group = data;
    } catch (error: any) {
      const {
        response: { data },
      } = error;
      throw data;
    }
    return group;
  },
  joinOrExitGroup: async (
    groupId: string,
    action: 'join' | 'exit',
  ): Promise<void> => {
    const url = getUrl(`/api/groups/${groupId}?action=${action}`);
    const headers = getHeaders();
    try {
      await axios.put(url, {}, { headers });
    } catch (error: any) {
      const {
        response: { data },
      } = error;
      throw data;
    }
  },
  deleteGroup: async (groupId: string): Promise<void> => {
    const url = getUrl(`/api/groups/${groupId}`);
    const headers = getHeaders();
    try {
      await axios.delete(url, { headers });
    } catch (error: any) {
      const {
        response: { data },
      } = error;
      throw data;
    }
  },
};
