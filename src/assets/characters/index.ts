const max = 14;
const extension = '.svg';

interface Row {
  id: number;
  image: string;
}

class CharacterModule {
  constructor(
    public readonly rows: Row[] = [...Array(max)].map((_, id) => {
      const imageName = ('0' + (id + 1)).slice(-2);
      const image = require(`./${imageName}${extension}`);
      return {
        id,
        image: String(image),
      };
    }),
  ) {}

  findById(id: number): Row | undefined {
    return this.rows.find((row) => row.id === id);
  }
}

export default new CharacterModule();
