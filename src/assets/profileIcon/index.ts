import data from "./data.json";
const max = 2;
const extension = ".svg";

interface Row {
  id: number;
  image: string;
  item: string;
}

class ProfileIconModule {
  constructor(
    public readonly rows: Row[] = [...Array(max)].map((_, id) => {
      const imageName = ("0" + (id + 1)).slice(-2);
      const image = require(`./${imageName}${extension}`);
      const row: Row = {
        id,
        image: String(image),
        item: String(data[id]),
      };
      return row;
    })
  ) {}

  findById(id: number): Row | undefined {
    return this.rows.find((row) => row.id === id);
  }
}

export default new ProfileIconModule();
