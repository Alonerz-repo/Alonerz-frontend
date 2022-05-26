import data from './data.json';

interface Row {
  id: number;
  item: string;
}

const CategoryModule = (() => ({
  rows: data.map((item, id) => ({ id, item })) as Row[],
  findById(id: number): Row | undefined {
    return this.rows.find((row) => row.id === id);
  },
}))();

export default CategoryModule;
