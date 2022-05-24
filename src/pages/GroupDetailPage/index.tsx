import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Group, groupAxios } from '../../axios/groupAxios';
import { useAppSelector } from '../../store/config';
import GroupParentComments from './GroupParentComments';
import GroupDetail from './GroupDetail';
import GroupMembers from './GroupMembers';

// util로 이동시킬 것
const DateFormatter = (dateString: Date) => {
  const date = new Date(dateString);
  return [`${date.getMonth() + 1}월`, `${date.getDate()}일`].join(' ');
};

// util로 이동시킬 것
const TimeFormatter = (dateString: Date) => {
  const date = new Date(dateString);
  return `${date.getHours()}:00`;
};

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

    const datetime = `${DateFormatter(startAt)} ${[
      TimeFormatter(startAt),
      TimeFormatter(endAt),
    ].join(' ~ ')}`;
    const groupDetailProps = {
      title,
      categoryId,
      imageUrl,
      datetime,
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

  return (
    <React.Fragment>
      {group ? (
        <React.Fragment>
          {renderGroupDetail()}
          {renderGroupMembers()}
          {renderGroupComments()}
          {/* 하위 댓글 목록 */}
          {/* 버튼 그룹 */}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default GroupDetailPage;
