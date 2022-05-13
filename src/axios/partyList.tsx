import axios from 'axios';
import { errorHandler, getHeaders, getUrl } from '../utils/api';

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
    title: 'aa',
    limit: 3,
    headcount: 2,
    address: 'my home',
    startAt: new Date(),
    endAt: new Date(),
    imageUrl:
      'https://github.com/choewy/react-place-app/blob/master/src/images/0.png?raw=true',
  },
];

const partyList = {
  // 최원영
  getPartyList: async () => {
    const url = getUrl('/api/groups/today');
    const headers = getHeaders();
    const data = await axios
      .get(url, { headers })
      .then((response) => response.data)
      .catch((error) => error.response.data);

    return data.error ? errorHandler(data) : data.groups;
  },
};

export default partyList;
