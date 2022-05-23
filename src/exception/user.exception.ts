import authAxios from "../axios/authAxios";
interface ErrorData {
  message: string[];
  error: string;
  statusCode: number;
}

export const userExceptions = {
  modify: async (error: ErrorData) => {
    if (error === undefined) {
      throw Error("Natwork Error!");
    }
    const { statusCode, message } = error;
    const errMessage = message.join("\n");
    let err;
    switch (statusCode) {
      case 400:
        err = new Error("잘못된 입력입니다.");
        err.name = statusCode.toString();
        err.message = errMessage;
        window.alert(err);
        throw err;
      case 401:
        throw Error("로그인이 필요합니다.");
      // return window.location.replace("/login");
      case 403:
        err = new Error("잘못된 입력입니다.");
        err.name = statusCode.toString();
        err.message = errMessage;
        window.alert(err);
        await authAxios.refreshUser();
        throw err;
      case 409:
        throw Error("닉네임이 중복되었습니다.");
      default:
        throw Error("서버 오류입니다.");
    }
  },
  // 콜백 방식으로 에러 핸들링 처리 : 컴포넌트에서 사용
  modify2: (error: ErrorData, callbacks: Function[]) => {
    const { message } = error;
    callbacks.forEach((callback) => {
      callback(message);
    });
  },

  token: async (error: any) => {
    const { statusCode, message } = error;
    const errMessage = message.join("\n");

    switch (statusCode) {
      case 400:
        return 0;
      case 403:
        const err = new Error("잘못된 입력입니다.");
        err.name = statusCode.toString();
        err.message = errMessage;
        window.alert(err);
        await authAxios.refreshUser();
        throw err;
    }
  },
};
