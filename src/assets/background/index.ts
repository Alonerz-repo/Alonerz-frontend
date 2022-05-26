import data from './data.json';

interface Row {
  id: number;
  color: string;
}

const BackgroundModule = (() => ({
  rows: data.map((color, id) => ({ id, color })),
  findById(id: number): Row | undefined {
    return this.rows.find((row) => row.id === id);
  },
}))();

export default BackgroundModule;
