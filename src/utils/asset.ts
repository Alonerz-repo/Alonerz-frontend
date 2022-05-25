import backgroundAssets from "../assets/data/backgrounds.json";
import characterAssets from "../assets/data/characters.json";
import iconAssets from "../assets/data/icons.json";
import stickerAssets from "../assets/data/stickers.json";
import careerAssets from "../assets/data/careers.json";
import yearAssets from "../assets/data/years.json";
import categoryAssets from "../assets/data/categories.json";

// 얘네들도 파일 나누시면 좋습니다!
interface BackgroundColor {
  id: number;
  color: string;
}

interface S3Image {
  id: number;
  url: string;
}

interface Career {
  id: number;
  group: string;
  item: string;
}

interface Year {
  id: number;
  item: string;
  careerId?: number;
}

interface Category {
  id: number;
  item: string;
}

const backgroundColors = backgroundAssets as Array<BackgroundColor>;
const characters = characterAssets as Array<S3Image>;
const icons = iconAssets as Array<S3Image>;
const stickers = stickerAssets as Array<S3Image>;
const careers = careerAssets as Array<Career>;
const years = yearAssets as Array<Year>;
const categories = categoryAssets as Array<Category>;

export const backgroundColorUtils = {
  getAll: () => backgroundColors,
  findById: (id: number) =>
    backgroundColors.find((background) => background.id === id),
};

export const characterImageUtils = {
  getAll: () => characters,
  findById: (id: number) => characters.find((character) => character.id === id),
};

export const iconImageUtils = {
  getAll: () => icons,
  findById: (id: number) => icons.find((icon) => icon.id === id),
};

export const stickerImageUtils = {
  getAll: () => stickers,
  findById: (id: number) => stickers.find((sticker) => sticker.id === id),
};

export const careerUtils = {
  //커리어 id값으로 해당 커리어를 반환합니다.
  findById: (id: number) => careers.find((career) => career.id === id),
  //직군 리스트를 반환합니다.
  getGroups: (): Array<string> => {
    const groups: string[] = [];
    careers.forEach((career: Career) => {
      !groups.includes(career.group) && groups.push(career.group);
    });
    return groups;
  },
  // 직군 이름으로 직업리스트를 반환합니다.
  getItems: (group: string) =>
    careers.filter((career) => career.group === group),
};

export const yearUtils = {
  findById: (id: number) => years.find((year) => year.id === id),
  getYearsByCareerId: (careerId: number) => {
    switch (careerId) {
      case 1:
        //학생
        return years.slice(0, 2);
      case 2:
        //백수
        return years.slice(2, 3);
      default:
        //기본값
        return years.slice(3);
    }
  },
};

export const categoryUtils = {
  getAll: () => categories,
  findById: (id: number) => categories.find((category) => category.id === id),
};
