import data from "./data.json";

interface Row {
  id: number;
  item: string;
}

class YearModule {
  constructor(
    public readonly rows: Row[] = data.map((item, id) => ({
      id,
      item,
    })),
  ) {}

  findById(id: number): Row | undefined {
    return this.rows.find((row) => row.id === id);
  }

  findByCareerId(careerId: number): Row[] {
    switch (careerId) {
      case 0:
        return this.rows.slice(0, 1);
      case 1:
        return this.rows.slice(1, 3);
      case 2:
        return this.rows.slice(3, 4);
      default:
        return this.rows.slice(4);
    }
  }
}

export default new YearModule();
