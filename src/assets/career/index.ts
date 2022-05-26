import data from "./data.json";

interface Row {
  id: number;
  group: string;
  item: string;
}

class CareerModule {
  constructor(
    public readonly rows: Row[] = data.map((row, id) => ({
      ...row,
      id: id + 1,
    })),
  ) {}

  findGroups() {
    const groups: string[] = [];
    this.rows.forEach((row: Row) => {
      const { group } = row;
      !groups.includes(group) && groups.push(group);
    });
    return groups;
  }

  findItemsByGroup(group: string) {
    return this.rows.filter((row: Row) => row.group === group);
  }

  findById(id: number): Row | undefined {
    return this.rows.find((row) => row.id === id);
  }
}

export default new CareerModule();
