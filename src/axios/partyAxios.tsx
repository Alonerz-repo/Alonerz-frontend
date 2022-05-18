import axios from "axios";
import { errorHandler, getHeaders, getUrl } from "../utils/api";

// 받아오는 유저 데이터의 인터페이스
interface userInfo {
  userId: string;
  nickname: string;
  image?: any;
  imageUrl?: string;
  year: string;
  description: string;
}

// group 데이터의 인터페이스
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

// 그룹의 초기 상태값, 데이터를 받아오기 전 화면을 미리 렌더링하기 위해 입력한 값
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
    userId: "-1",
    nickname: "",
    image: null,
    imageUrl: "",
    year: "",
    description: "",
  },
  guests: [
    {
      userId: "-1",
      nickname: "",
      image: null,
      imageUrl: "",
      year: "",
      description: "",
    },
  ],
};

export type Group = Partial<GroupInfo>;

// 데이터의 최신화를 위해 redux를 사용하지 않고 각 페이지별로 필요한 데이터를 받아옴
export const partyAxios = {
  // 파티 생성시 서버와 통신
  // 파일 데이터 전송을 위해 FormData 사용
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

  // 파티 수정시 서버와 통신
  // 파일 데이터 전송을 위해 FormData 사용
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

  // 파티 삭제 요청
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

  // 파티 리스트의 정보 요청
  getPartyInfo: async (groupId: string) => {
    const url = getUrl(`/api/groups/${groupId}`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((response) => response.data)
      .catch((error) => error.response.data);

    return data.error ? errorHandler(data) : data.group;
  },

  // 사용자가 현재까지 참여했던 모든 파티 정보 요청
  getJoinedParty: async (userId: any) => {
    const url = getUrl(`/api/groups/${userId}/joined`);
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((res) => {
        return res;
      })
      .catch((err) => err.response.data);
    return data.err ? errorHandler(data) : data;
  },

  // 사용자의 파티 참가,나가기 요청
  // action : join 또는 exit 스트링
  joinParty: async (groupId: string, action: string) => {
    const url = getUrl(`/api/groups/${groupId}?action=${action}`);
    const headers = getHeaders();
    console.log(groupId, action);
    const data = await axios
      .put(url, {}, { headers })
      .then((res) => {
        return res;
      })
      .catch((err) => err.response.data);
    return data.err ? errorHandler(data) : data;
  },
};

export default partyAxios;
