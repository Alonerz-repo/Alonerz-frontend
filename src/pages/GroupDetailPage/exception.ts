import {
  AlertModalProps,
  initAlertModalProps,
} from "../../components/AlertModal";
import { NavigateFunction } from "react-router-dom";

export interface GroupDetailPageStatusCode {
  statusCode: 401 | 403 | 404 | 409 | 500;
}

export const GroupDetailPageException = (
  navigate: NavigateFunction,
  setAlertModalProps: React.Dispatch<React.SetStateAction<AlertModalProps>>,
) => ({
  401: () => navigate("/login"),
  403: () => window.location.reload(),
  404: () => {
    setAlertModalProps({
      message: "삭제되었거나 존재하지 않는 그룹입니다.",
      closeLabel: "확인",
      onClose: () => {
        setAlertModalProps(initAlertModalProps);
        navigate("/");
      },
    });
  },
  409: () => {
    setAlertModalProps({
      message: "참여인원이 가득 찼습니다.",
      closeLabel: "확인",
      onClose: () => {
        setAlertModalProps(initAlertModalProps);
        navigate(0);
      },
    });
  },
  500: () => {
    setAlertModalProps({
      message: "서버에 오류가 발생하였습니다.",
      closeLabel: "확인",
      onClose: () => {
        setAlertModalProps(initAlertModalProps);
        navigate("/");
      },
    });
  },
});
