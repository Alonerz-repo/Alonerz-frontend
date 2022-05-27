import data from './data.json';

interface Row {
  id: number;
  item: string;
}

class CategoryModule {
  constructor(
    public readonly rows: Row[] = data.map((item, id) => ({ id, item })),
  ) {}

  findById(id: number): Row | undefined {
    return this.rows.find((row) => row.id === id);
  }

  findCategories() : Row[] {
    return this.rows
  }
}

export default new CategoryModule();
