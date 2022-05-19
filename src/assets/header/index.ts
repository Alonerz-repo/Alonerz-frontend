//사용자 헤더 아이콘입니다.
//json으로 리펙토링시 성능상 유리
import login from "./kakaologin.svg";
import notion from "./notion.svg";
import mylogo from "./Logo.svg";

const icon = [
  require("./home.png"),
  require("./setting.png"),
  require("./chat.png"),
  require("./1.svg"),
];

export const kakaoImg = login;
export const noti = notion;
export const logo = mylogo;
export default icon;
