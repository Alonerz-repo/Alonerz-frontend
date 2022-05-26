import data from "./data.json";
const max = 4;
const extension = ".png";

interface Row {
  id: number;
  image: string;
  content: string;
}

class OnboardModule {
  constructor(
    public readonly rows: Row[] = [...Array(max)].map((_, id) => {
      const imageName = ("0" + (id + 1)).slice(-2);
      const image = require(`./${imageName}${extension}`);
      const row: Row = {
        id,
        image: String(image),
        content: String(data[id]),
      };
      return row;
    }),
  ) {}

  len(): number {
    return this.rows.length;
  }
}

export default new OnboardModule();
