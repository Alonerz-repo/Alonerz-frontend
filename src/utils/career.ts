interface MyCareer {
  careerId: number;
  careerGroupName: string;
  careerItemName: string;
}

const Career: Array<MyCareer> = [
  { careerId: 1, careerGroupName: "무직", careerItemName: "대학생" },
  { careerId: 2, careerGroupName: "무직", careerItemName: "취준생" },
  { careerId: 3, careerGroupName: "개발직군", careerItemName: "웹개발" },
  { careerId: 4, careerGroupName: "개발직군", careerItemName: "응용프로그램" },
  { careerId: 5, careerGroupName: "개발직군", careerItemName: "서버" },
  { careerId: 6, careerGroupName: "개발직군", careerItemName: "인프라" },
  { careerId: 7, careerGroupName: "개발직군", careerItemName: "안드로이드" },
  { careerId: 8, careerGroupName: "개발직군", careerItemName: "IOS" },
];

export default Career;
