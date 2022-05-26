import data from './data.json';
const max = 4;
const extension = '.png';

interface Data {
  id: number;
  image: string;
  content: string;
}

const OnboardModule = (() => ({
  rows: [...Array(max)].map((_, id) => {
    const imageName = ('0' + (id + 1)).slice(-2);
    const image = require(`./${imageName}${extension}`);
    const row: Data = {
      id,
      image: String(image),
      content: String(data[id]),
    };
    return row;
  }),
  len(): number {
    return this.rows.length;
  },
}))();

export default OnboardModule;
