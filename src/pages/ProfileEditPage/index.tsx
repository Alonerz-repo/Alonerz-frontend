import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userAxios from "../../axios/userAxios";
import { useAppSelector } from "../../store/config";
import CareerModule from "../../assets/career";
import YearModule from "../../assets/year";
import Header from "../../components/Header";
import * as Style from "./styled";

interface UserProfile {
  userId: string;
  nickname: string;
  careerId: number;
  yearId: number;
  description: string;
}

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { userId } = useAppSelector((state) => state.user);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [careerGroup, setCareerGroup] = useState<string>();

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
      // TODO : 예외처리
      const { statusCode } = error;
      console.log(statusCode);
    }
  }, [userId]);

  const saveUserProfileImage = useCallback(async () => {}, []);
  const saveUserProfile = useCallback(async () => {
    console.log(1);
  }, []);

  useEffect(() => {
    getUserProfile();
    return () => {};
  }, [userId, navigate, getUserProfile]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setUserProfile({
      ...(userProfile as UserProfile),
      [name]: ["careerId", "yearId"].includes(name) ? Number(value) : value,
    });
  };

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

  const renderDescriptionInput = () => {
    const { description } = userProfile as UserProfile;
    const inputProps = {
      name: "description",
      value: description,
      onChange: onInputChange,
      placeholder: "한 줄로 자신을 소개해보세요.",
      autoComplete: "off",
    };
    return <Style.InputField {...inputProps} />;
  };

  return (
    <>
      <Header
        type="userEdit"
        text="내 정보 수정"
        setting={saveUserProfile}
        btnName="수정"
      />
      {userProfile ? (
        // 사진 등록, 수정, 삭제
        <Style.Wrapper>
          {renderProfileImage()}

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
