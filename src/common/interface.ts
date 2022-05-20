export interface Group {
  groupId: number;
  title: string;
  menu: string;
  placeName: string;
  imageUrl: string;
  startAt: string;
  endAt: string;
  limit: number;
  host: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
    careerId: number;
    year: string;
    description: string;
  };
  join: number;
}

export interface CategoryItem {
  value: number | string;
  name: string;
}
