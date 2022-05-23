const baseurl =
  "https://alonerz-storage.s3.ap-northeast-2.amazonaws.com/assets/character";

interface CharacterAsset {
  id: number;
  url: string;
}

// 캐릭터 배열 생성
export const characterAssets: CharacterAsset[] = (() => {
  return Array(5).map((i) => ({
    id: i,
    url: `${baseurl}${("0" + i).slice(-2)}.svg`,
  }));
})();
