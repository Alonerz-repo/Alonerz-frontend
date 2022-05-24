import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Group, groupAxios } from '../../axios/groupAxios';
import { useAppSelector } from '../../store/config';
import GroupParentComments from './GroupParentComments';
import GroupDetail from './GroupDetail';
import GroupMembers from './GroupMembers';
import styled from 'styled-components';
import Header from '../../components/Header';

// util로 이동시킬 것
const DateFormatter = (dateString: Date) => {
  const date = new Date(dateString);
  return [
    `0${date.getMonth() + 1}`.slice(-2) + '월',
    `0${date.getDate()}`.slice(-2) + '일',
  ].join(' ');
};

// util로 이동시킬 것
const TimeFormatter = (dateString: Date) => {
  const date = new Date(dateString);
  return [
    `0${date.getHours()}`.slice(-2),
    `0${date.getMinutes()}`.slice(-2),
  ].join(':');
};

// utils로 이동시킬 것
const DDayCalculator = (dateString: Date) => {
  const today = new Date().getTime();
  const target = new Date(dateString).getTime();
  const diffTime = target - today;
  const diffDays = Math.abs(Math.ceil(diffTime / (1000 * 3600 * 24)));
  if (diffDays === 0) {
    return `D-Day`;
  }
  return `D${diffDays > 0 ? '+' : '-'}${diffDays}`;
};

const ButtonBox = styled.div`
  width: 390px;
  height: 70px;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const RedButton = styled.div`
  cursor: pointer;
  color: #ffffff;
  background: #f84c40;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GrayButton = styled.div`
  cursor: pointer;
  color: #616161;
  background: #bdbdbd;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GroupDetailPage = () => {
  const { userId } = useAppSelector((state) => state.user);
  const { groupId } = useParams<string>();
  const [group, setGroup] = useState<Group>();

  // After :: Custom Hook
  useEffect(() => {
    const getGroup = async () => {
      try {
        const group = await groupAxios.getOneByGroupId(groupId as string);
        setGroup(group);
      } catch (e) {
        console.log(e);
      }
    };
    getGroup();
  }, [groupId]);

  // 그룹 상세 내용 렌더링
  const renderGroupDetail = () => {
    const {
      title,
      categoryId,
      imageUrl,
      description,
      startAt,
      endAt,
      locationX,
      locationY,
      address,
      placeName,
      createdAt,
      updatedAt,
    } = group as Group;

    const dDay = DDayCalculator(startAt);
    const dateString = DateFormatter(startAt);
    const timeString = [TimeFormatter(startAt), TimeFormatter(endAt)].join(
      ' ~ ',
    );
    const groupDetailProps = {
      title,
      dDay,
      categoryId,
      imageUrl,
      dateString,
      timeString,
      description,
      locationX,
      locationY,
      address,
      placeName,
      createdAt,
      updatedAt,
    };
    return <GroupDetail {...groupDetailProps} />;
  };

  // 그룹 참여 인원 목록 렌더링
  const renderGroupMembers = () => {
    const { host, guests, limit } = group as Group;
    const memberCount = `(${guests.length + 1}/${limit})`;
    const groupMembersProps = { memberCount, host, guests };
    return <GroupMembers {...groupMembersProps} />;
  };

  // 그룹 댓글 목록 렌더링
  const renderGroupComments = () => {
    const groupCommentsProps = { groupId: groupId as string, userId };
    return <GroupParentComments {...groupCommentsProps} />;
  };

  // 수정, 삭제, 참여, 탈퇴 버튼 렌더링
  const renderGroupButtons = () => {
    const { host, guests } = group as Group;

    if (host.userId === userId) {
      return (
        <ButtonBox>
          <RedButton>수정</RedButton>
          <RedButton>삭제</RedButton>
        </ButtonBox>
      );
    }

    const isAlreadyJoin = guests.find((guest) => guest.userId === userId);
    return (
      <ButtonBox>
        {isAlreadyJoin ? (
          <GrayButton>탈퇴하기</GrayButton>
        ) : (
          <RedButton>참여하기</RedButton>
        )}
      </ButtonBox>
    );
  };

  return (
    <React.Fragment>
      <Header text="" />
      {group ? (
        <React.Fragment>
          {renderGroupDetail()}
          {renderGroupMembers()}
          {renderGroupComments()}
          {renderGroupButtons()}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default GroupDetailPage;
