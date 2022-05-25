import authAxios from "../axios/authAxios";
interface ErrorData {
  message: string[];
  error: string;
  statusCode: number;
}

export const userExceptions = {
  modify: async (error: ErrorData) => {
    console.log("my error", error);
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
      case 403:
        err = new Error("잘못된 입력입니다.");
        err.name = statusCode.toString();
        err.message = errMessage;
        window.alert(err);
        authAxios.refreshUser().then((_) => window.location.replace("/"));
        throw err;
      case 409:
        window.alert("닉네임이 중복되었습니다.");
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

  joinParty: async (error: any) => {
    console.log(error);
    const { statusCode } = error;
    switch (statusCode) {
      case 500:
        const err = new Error("서버 에러");
        throw err;
    }
  },

  board: async (err: any) => {
    console.log(err);
    const { statusCode } = err;
    switch (statusCode) {
      case 400:
        return Error("?");
      case 403:
        authAxios.refreshUser().then((_) => window.location.reload());
        return Error("재인증");
    }
  },

  follow: async (err: any) => {
    console.log(err);
    const { statusCode } = err;
    switch (statusCode) {
      case 401:
        throw Error("로그인");
      case 403:
        throw Error("token");
    }
  },
};
