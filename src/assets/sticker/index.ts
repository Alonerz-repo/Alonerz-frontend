const max = 37;
const extension = ".svg";

interface Row {
  id: number;
  image: string;
}

class StickerModule {
  constructor(
    public readonly rows = [...Array(max)].map((_, id) => {
      const imageName = ("0" + (id + 1)).slice(-2);
      const image = require(`./${imageName}${extension}`);
      const row = {
        id,
        image,
      } as Row;
      return row;
    }),
  ) {}

  findById(id: number): Row | undefined {
    return this.rows.find((row) => row.id === id);
  }
}

export default new StickerModule();
