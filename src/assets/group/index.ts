const max = 6;
const extension = ".svg";

interface Row {
  id: number;
  image: string;
}

class GroupImage {
  constructor(
    public readonly rows: Row[] = [...Array(max)].map((_, id) => {
      const imageName = ("0" + (id + 1)).slice(-2);
      const image = require(`./${imageName}${extension}`);
      return {
        id,
        image: String(image),
      };
    }),
  ) {}
}

const GroupImageModule = new GroupImage();
export default GroupImageModule;
