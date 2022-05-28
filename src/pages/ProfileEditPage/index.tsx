import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userAxios from "../../axios/userAxios";
import { useAppSelector } from "../../store/config";
import CareerModule from "../../assets/career";
import YearModule from "../../assets/year";
import Header from "../../components/Header";
import ConfirmModal, {
  ConfirmModalProps,
  initConfirmModalProps,
} from "../../components/ConfirmModal";
import AlertModal, {
  AlertModalProps,
  initAlertModalProps,
} from "../../components/AlertModal";
import * as Style from "./styled";

interface UserProfile {
  userId: string;
  nickname: string;
  careerId: number;
  yearId: number;
  description: string;
}

// TODO : 멘트 구성
const placeholders = [
  "이 구역의 맛집골목대장이신가요?",
  "저는! 개발자랍니다!",
  "디자인 재미있으신가요?",
];
const random = Math.abs(Math.ceil(Math.random() * placeholders.length) - 1);

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { userId } = useAppSelector((state) => state.user);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [careerGroup, setCareerGroup] = useState<string>();
  const [confirmModalProps, setConfirmMoalProps] = useState<ConfirmModalProps>(
    initConfirmModalProps,
  );
  const [alertMoalProps, setAlertModalProps] =
    useState<AlertModalProps>(initAlertModalProps);

  const onCloseAlertModal = () => setAlertModalProps(initAlertModalProps);
  const onCloseConfirmModal = () => setConfirmMoalProps(initConfirmModalProps);

  // 사용자 프로필 정보 가져오기
  const getUserProfile = useCallback(async () => {
    if (userId === "-1") return;
    try {
      const user = await userAxios.getUserProfile(userId);
      const { nickname, careerId, yearId, description, profileImageUrl } = user;
      const { group } = CareerModule.findById(careerId) as { group: string };
      setProfileImageUrl(profileImageUrl);
      setUserProfile({ userId, nickname, careerId, yearId, description });
      setCareerGroup(group);
    } catch (error: any) {
      const { statusCode } = error;
      switch (statusCode) {
        case 401:
          return navigate("/login");
        case 403:
          return console.log(
            "토큰 재발급 후 다시 실행\n토큰 재발급 실패 시 로그인 페이지로 이동",
          );
        case 404:
          return setAlertModalProps({
            message: "삭제되었거나 존재하지 않는 사용자입니다.",
            onClose: () => {
              onCloseAlertModal();
              return navigate("/");
            },
            closeLabel: "확인",
          });
        default:
          return setAlertModalProps({
            message: "서버 내부적인 오류가 발생하였습니다.",
            onClose: onCloseAlertModal,
            closeLabel: "확인",
          });
      }
    }
  }, [navigate, userId]);

  // 프로필 이미지 저장
  const saveProfileImage = useCallback(
    async (image: File) => {
      try {
        const profileImageUrl = await userAxios.uploadProfileImage(image);
        setProfileImageUrl(profileImageUrl);
      } catch (error: any) {
        const { statusCode } = error;
        switch (statusCode) {
          case 400:
            return setAlertModalProps({
              message: "이미지 파일 용량이 너무 큽니다.",
              onClose: onCloseAlertModal,
              closeLabel: "확인",
            });
          case 401:
            return navigate("/login");
          case 403:
            return console.log(
              "토큰 재발급 후 다시 실행\n토큰 재발급 실패 시 로그인 페이지로 이동",
            );
          default:
            return setAlertModalProps({
              message: "서버 내부적인 오류가 발생하였습니다.",
              onClose: onCloseAlertModal,
              closeLabel: "확인",
            });
        }
      }
    },
    [navigate],
  );

  // 프로필 이미지 삭제
  const deleteProfileImage = useCallback(async () => {
    try {
      await userAxios.deleteProfileImage();
      setProfileImageUrl(null);
      onCloseConfirmModal();
    } catch (error: any) {
      const { statusCode } = error;
      switch (statusCode) {
        case 401:
          return navigate("/login");
        case 403:
          return console.log(
            "토큰 재발급 후 다시 실행\n토큰 재발급 실패 시 로그인 페이지로 이동",
          );
        default:
          return setAlertModalProps({
            message: "서버 내부적인 오류가 발생하였습니다.",
            onClose: onCloseAlertModal,
            closeLabel: "확인",
          });
      }
    }
  }, [navigate]);

  // 사용자 프로필 정보 저장
  const saveProfile = useCallback(async () => {
    const { nickname, careerId, yearId, description } =
      userProfile as UserProfile;
    if (!isNaN(Number(nickname)))
      return setAlertModalProps({
        message: "닉네임을 입력하세요.",
        onClose: onCloseAlertModal,
        closeLabel: "확인",
      });
    if (careerId === 0)
      return setAlertModalProps({
        message: "직군과 직업을 선택하세요.",
        onClose: onCloseAlertModal,
        closeLabel: "확인",
      });
    if (yearId === 0)
      return setAlertModalProps({
        message: "연차를 선택하세요.",
        onClose: onCloseAlertModal,
        closeLabel: "확인",
      });
    try {
      await userAxios.updateUserProfile({
        nickname,
        careerId,
        yearId,
        description,
      });
      return setAlertModalProps({
        message: "저장되었습니다.",
        onClose: () => {
          onCloseAlertModal();
          return navigate("/");
        },
        closeLabel: "확인",
      });
    } catch (error: any) {
      const { statusCode } = error;
      switch (statusCode) {
        case 400:
          return setAlertModalProps({
            message: "입력란을 다시 확인하세요.",
            onClose: onCloseAlertModal,
            closeLabel: "확인",
          });
        case 401:
          return navigate("/login");
        case 403:
          return console.log(
            "토큰 재발급 후 다시 실행\n토큰 재발급 실패 시 로그인 페이지로 이동",
          );
        case 409:
          return setAlertModalProps({
            message: "이미 사용중인 닉네임입니다.",
            onClose: onCloseAlertModal,
            closeLabel: "확인",
          });
        default:
          return setAlertModalProps({
            message: "서버 내부적인 오류가 발생하였습니다.",
            onClose: onCloseAlertModal,
            closeLabel: "확인",
          });
      }
    }
  }, [navigate, userProfile]);

  // 사용자 프로필 정보 불러오기
  useEffect(() => {
    getUserProfile();
    return () => {};
  }, [userId, navigate, getUserProfile]);

  // input<string> 이벤트 핸들러
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setUserProfile({
      ...(userProfile as UserProfile),
      [name]: ["careerId", "yearId"].includes(name) ? Number(value) : value,
    });
  };

  // input<File> 이벤트 핸들러
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    const images = files as FileList;
    const image = images[0] as File;
    await saveProfileImage(image);
  };

  // label Click 이벤트 핸들러
  const onFileDeleteClick = () => {
    if (profileImageUrl) {
      setConfirmMoalProps({
        message: "프로필 이미지를 삭제하시겠습니까?",
        yesLabel: "삭제",
        noLabel: "취소",
        onOk: deleteProfileImage,
        onClose: onCloseConfirmModal,
      });
    }
  };

  // select 이벤트 핸들러
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { name, value },
    } = e;
    switch (name) {
      case "careerGroup":
        const career = CareerModule.findItemsByGroup(value)[0];
        const year = YearModule.findByCareerId(career.id)[0];
        setCareerGroup(value);
        setUserProfile({
          ...(userProfile as UserProfile),
          careerId: career.id,
          yearId: year.id,
        });
        return;
      case "careerId":
        const careerId = Number(value);
        setUserProfile({ ...(userProfile as UserProfile), careerId });
        return;
      case "yearId":
        const yearId = Number(value);
        setUserProfile({ ...(userProfile as UserProfile), yearId });
        return;
      default:
        return;
    }
  };

  // 라벨 렌더링
  const renderLabel = (label: string, required: boolean = false) => {
    return (
      <Style.Label>
        <Style.LabelText>{label}</Style.LabelText>
        {required && (
          <Style.LabelRequired style={{ color: "red" }}>*</Style.LabelRequired>
        )}
      </Style.Label>
    );
  };

  // 프로필 이미지 렌더링
  const renderProfileImage = () => {
    const imageUrl = profileImageUrl as string;
    return <Style.Profilemage imageUrl={imageUrl} />;
  };

  // 프로필 이미지 변경 도구 렌더링
  const renderImageSelector = () => {
    const inputProps = {
      id: "input-profile-image",
      type: "file",
      accept: "image/*",
      onChange: onFileChange,
    };

    const uploadLabelProps = {
      htmlFor: "input-profile-image",
    };

    const deleteLabelProps = {
      onClick: onFileDeleteClick,
    };

    return (
      <Style.ImageSelectorWrapper>
        <Style.ImageInput {...inputProps} />
        <Style.ImageLabel {...uploadLabelProps}>
          <Style.ImageUploadIcon />
        </Style.ImageLabel>
        <Style.ImageLabel {...deleteLabelProps}>
          <Style.ImageDeleteIcon />
        </Style.ImageLabel>
      </Style.ImageSelectorWrapper>
    );
  };

  // 닉네임 입력 렌더링
  const renderNicknameInput = () => {
    const { nickname } = userProfile as UserProfile;
    const inputProps = {
      name: "nickname",
      value: nickname,
      onChange: onInputChange,
      placeholder: "닉네임을 입력하세요.",
      autoComplete: "off",
    };
    return <Style.InputField {...inputProps} />;
  };

  // 직군 선택 렌더링
  const renderCareerGroupSelect = () => {
    const name = "careerGroup";
    const value = careerGroup;
    const careerGroupSelectProps = {
      id: name,
      name,
      value,
      onChange: onSelectChange,
    };
    return (
      <Style.SelectField {...careerGroupSelectProps}>
        {CareerModule.groups.map((group, index) => (
          <option key={`${userId}-${group}-${index}`} value={group}>
            {group}
          </option>
        ))}
      </Style.SelectField>
    );
  };

  // 직업 선택 렌더링
  const renderCareerItemSelect = () => {
    const { careerId } = userProfile as UserProfile;
    const careerItemSelectProps = {
      name: "careerId",
      value: careerId,
      onChange: onSelectChange,
    };
    return (
      <Style.SelectField {...careerItemSelectProps}>
        {CareerModule.findItemsByGroup(careerGroup as string).map((career) => {
          const { id, item } = career;
          return (
            <option key={`${userId}-${item}-${id}`} value={id}>
              {career.item}
            </option>
          );
        })}
      </Style.SelectField>
    );
  };

  // 연차 선택 렌더링
  const renderYearSelect = () => {
    const { careerId, yearId } = userProfile as UserProfile;
    const years = YearModule.findByCareerId(careerId);
    const yearSelectProps = {
      name: "yearId",
      value: yearId,
      onChange: onSelectChange,
    };
    return (
      <Style.SelectField {...yearSelectProps}>
        {years.map((year) => {
          const { id, item } = year;
          return (
            <Style.Option key={`${userId}-${item}-${id}`} value={id}>
              {item}
            </Style.Option>
          );
        })}
      </Style.SelectField>
    );
  };

  // 한 줄 소개 렌더링
  const renderDescriptionInput = () => {
    const { description } = userProfile as UserProfile;
    const inputProps = {
      name: "description",
      value: description,
      onChange: onInputChange,
      placeholder: placeholders[random],
      autoComplete: "off",
    };

    return <Style.InputField {...inputProps} />;
  };

  return (
    <>
      <AlertModal {...alertMoalProps} />
      <ConfirmModal {...confirmModalProps} />
      <Header
        type="userEdit"
        text="내 정보 수정"
        setting={saveProfile}
        btnName={!isNaN(Number(userProfile?.nickname)) ? "완료" : "수정"}
      />
      {userProfile ? (
        // 사진 등록, 수정, 삭제
        <Style.Wrapper>
          <Style.ProfileImageWrapper>
            {renderProfileImage()}
            {renderImageSelector()}
          </Style.ProfileImageWrapper>
          <Style.ContentWrapper>
            <Style.ContentColumn>
              {renderLabel("닉네임", true)}
              {renderNicknameInput()}
            </Style.ContentColumn>
          </Style.ContentWrapper>

          <Style.ContentWrapper>
            <Style.ContentRow>
              <Style.Content>
                {renderLabel("직군", true)}
                {renderCareerGroupSelect()}
              </Style.Content>

              <Style.Content>
                {renderLabel("직업", true)}
                {renderCareerItemSelect()}
              </Style.Content>
            </Style.ContentRow>
          </Style.ContentWrapper>

          <Style.ContentWrapper>
            <Style.ContentColumn>
              {renderLabel("연차", true)}
              {renderYearSelect()}
            </Style.ContentColumn>
          </Style.ContentWrapper>

          <Style.ContentWrapper>
            <Style.ContentColumn>
              {renderLabel("한 줄 소개", false)}
              {renderDescriptionInput()}
            </Style.ContentColumn>
          </Style.ContentWrapper>
        </Style.Wrapper>
      ) : null}
    </>
  );
};

export default ProfileEditPage;
