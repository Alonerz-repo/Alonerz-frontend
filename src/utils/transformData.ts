import { CreateForm } from "../axios/partyAxios";

export const transformCreate = (data: CreateForm): CreateForm => {
  const Info = {
    title: data.title,
    description: data.description,
    categoryId: data.categoryId as number,
    placeName: data.placeName,
    address: data.address,
    locationX: data.locationX,
    locationY: data.locationY,
    limit: data.limit,
    startAt: new Date(
      data.date ? data.date.setHours(data.startAt ?? 0, 0, 0) : "",
    ),
    endAt: new Date(data.date ? data.date.setHours(data.endAt ?? 0, 0, 0) : ""),
  };
  if (data.image === null) {
    return { ...Info };
  } else {
    return { ...Info, image: data.image };
  }
};

export const transformEditPage = (data: any): CreateForm => {
  const Info: CreateForm = {
    title: data.title,
    description: data.description,
    categoryId: data.categoryId,
    placeName: data.placeName,
    limit: data.limit,
    date: data.startAt ? new Date(data.startAt) : new Date(),
    startAt: data.startAt ? new Date(data.startAt).getHours() : new Date(),
    endAt: data.endAt ? new Date(data.endAt).getHours() : new Date(),
    locationX: data.locationX,
    locationY: data.locationY,
  };
  return Info;
};
