const max = 14;
const extention = '.svg';

interface Row {
  id: number;
  image: string;
}

const CharacterModule = (() => ({
  rows: [...Array(max)].map((_, id) => {
    const imageName = ('0' + (id + 1)).slice(-2);
    const image = require(`./${imageName}${extention}`);
    return {
      id,
      image: String(image),
    };
  }),
  findById(id: number): Row | undefined {
    return this.rows.find((row) => row.id === id);
  },
}))();

export default CharacterModule;
