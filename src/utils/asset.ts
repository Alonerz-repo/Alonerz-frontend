import stickerAssets from '../assets/data/stickers.json';

// 얘네들도 파일 나누시면 좋습니다!

interface S3Image {
  id: number;
  url: string;
}

const stickers = stickerAssets as Array<S3Image>;

export const stickerImageUtils = {
  getAll: () => stickers,
  findById: (id: number) => stickers.find((sticker) => sticker.id === id),
};
