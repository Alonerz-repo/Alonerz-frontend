import {
    AlertModalProps,
    initAlertModalProps,
  } from '../../components/AlertModal';
  import { NavigateFunction } from 'react-router-dom';
export interface EditStatusCode {
    statusCode: 400 | 401 | 403 | 500;
}

export const EditGroupException = (
    navigate: NavigateFunction,
    setAlertModalProps: React.Dispatch<React.SetStateAction<AlertModalProps>>,
    ) => ({
    400: () => {
        setAlertModalProps({
        message: "입력이 잘못되었습니다.",
        closeLabel: "확인",
        onClose: () => {
        setAlertModalProps(initAlertModalProps);
        },
    })},
    401: () => navigate('/login'),
    403: () => window.location.reload(),
    500: () => {
        setAlertModalProps({
            message: '서버에 오류가 발생하였습니다.',
            closeLabel: '확인',
            onClose: () => {
                setAlertModalProps(initAlertModalProps);
            },
        });
    },
});