import data from "./data.json";

interface Row {
  id: number;
  item: string;
}

class YearModule {
  constructor(
    public readonly rows: Row[] = data.map((item, id) => ({
      id: id + 1,
      item,
    })),
  ) {}

  findById(id: number): Row | undefined {
    return this.rows.find((row) => row.id === id);
  }

  findByCareerId(careerId: number): Row[] {
    switch (careerId) {
      case 1:
        return this.rows.slice(0, 2);
      case 2:
        return this.rows.slice(2, 3);
      default:
        return this.rows.slice(3);
    }
  }
}

export default new YearModule();
