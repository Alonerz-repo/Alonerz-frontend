const config = {
  KAKAO_REST_API_KEY: process.env.REACT_APP_KAKAO_REST_API_KEY,
  KAKAO_REDIRECT_URL: process.env.REACT_APP_KAKAO_REDIRECT_URL,
};

// 카카오 로그인페이지 URL
export const kakaoRedirectUrl = (() => {
  const host = "https://kauth.kakao.com/oauth/authorize";
  const params = [
    `client_id=${config.KAKAO_REST_API_KEY}`,
    `redirect_uri=${config.KAKAO_REDIRECT_URL}`,
    `response_type=code`,
  ].join("&");
  // console.log(config.KAKAO_REST_API_KEY);
  // console.log(config.KAKAO_REDIRECT_URL);

  return `${host}?${params}`;
})();
