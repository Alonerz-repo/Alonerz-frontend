import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Group, groupAxios } from "../../axios/groupAxios";
import { useAppSelector } from "../../store/config";
import GroupParentComments from "./GroupParentComments";
import GroupDetail from "./GroupDetail";
import GroupMembers from "./GroupMembers";
import styled from "styled-components";
import Header from "../../components/Header";
import ConfirmModal, {
  ConfirmModalProps,
  initConfirmModalProps,
} from "../../components/ConfirmModal";
import AlertModal, {
  AlertModalProps,
  initAlertModalProps,
} from "../../components/AlertModal";
import {
  GroupDetailPageException,
  GroupDetailPageStatusCode,
} from "./exception";
import {
  DateFormatter,
  TimeFormatter,
  TimeGetter,
} from "../../utils/tools/formatter";
import { CheckJoinable } from "../../utils/tools/calculator";
import { Container } from "./styled";

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
  @media screen and (max-width: 420px) {
    width: 100%;
  }
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
  font-weight: 500;
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
  font-weight: 500;
`;

const GroupDetailPage = () => {
  const navigate = useNavigate();
  const { userId } = useAppSelector((state) => state.user);
  const { groupId } = useParams<string>();
  const [group, setGroup] = useState<Group>();
  const [confirmModalProps, setConfirmMoalProps] = useState<ConfirmModalProps>(
    initConfirmModalProps,
  );
  const [alertMoalProps, setAlertModalProps] =
    useState<AlertModalProps>(initAlertModalProps);

  // After :: Custom Hook
  useEffect(() => {
    const getGroup = async () => {
      try {
        const group = await groupAxios.getOneByGroupId(groupId as string);
        setGroup(group);
      } catch (e) {
        const { statusCode } = e as GroupDetailPageStatusCode;
        GroupDetailPageException(navigate, setAlertModalProps)[statusCode]();
      }
    };
    getGroup();
  }, [navigate, groupId]);

  const onCloseConfirmModal = () => setConfirmMoalProps(initConfirmModalProps);
  const onEditClick = () => navigate(`/edit/partyInfo/${groupId}`);
  const onDeleteClick = () => {
    setConfirmMoalProps({
      message: "????????? ?????????????????????????",
      yesLabel: "??????",
      noLabel: "??????",
      onOk: async () => {
        try {
          await groupAxios.deleteGroup(groupId as string);
          onCloseConfirmModal();
          navigate("/");
        } catch (e) {
          const { statusCode } = e as GroupDetailPageStatusCode;
          onCloseConfirmModal();
          GroupDetailPageException(navigate, setAlertModalProps)[statusCode]();
        }
      },
      onClose: onCloseConfirmModal,
    });
  };

  const onExitClick = async () => {
    setConfirmMoalProps({
      message: "???????????? ?????????????????????????",
      yesLabel: "?????????",
      noLabel: "??????",
      onOk: async () => {
        try {
          await groupAxios.joinOrExitGroup(groupId as string, "exit");
          const group = await groupAxios.getOneByGroupId(groupId as string);
          onCloseConfirmModal();
          setGroup(group);
        } catch (e) {
          onCloseConfirmModal();
        }
      },
      onClose: onCloseConfirmModal,
    });
  };

  const onJoinClick = async () => {
    try {
      await groupAxios.joinOrExitGroup(groupId as string, "join");
      const group = await groupAxios.getOneByGroupId(groupId as string);
      setGroup(group);
    } catch (e) {
      const { statusCode } = e as GroupDetailPageStatusCode;
      GroupDetailPageException(navigate, setAlertModalProps)[statusCode]();
    }
  };

  const onBackClick = () => navigate(-1);

  // ?????? ?????? ?????? ?????????
  const renderGroupDetail = () => {
    const {
      title,
      categoryId,
      imageUrl,
      description,
      locationX,
      locationY,
      address,
      placeName,
      createdAt,
      updatedAt,
    } = group as Group;

    const groupDetailProps = {
      title,
      categoryId,
      imageUrl,
      isMorning,
      dateString,
      timeString,
      description,
      locationX,
      locationY,
      address,
      placeName,
      createdAt,
      updatedAt,
      badgeLabel,
      badgeColor,
    };
    return <GroupDetail {...groupDetailProps} />;
  };

  // ?????? ?????? ?????? ?????? ?????????
  const renderGroupMembers = () => {
    const { host, guests, limit } = group as Group;
    const memberCount = `(${guests.length + 1}/${limit})`;
    const groupMembersProps = { memberCount, host, guests, navigate };
    return <GroupMembers {...groupMembersProps} />;
  };

  // ?????? ?????? ?????? ?????????
  const renderGroupComments = () => {
    const groupCommentsProps = { groupId: groupId as string, userId };
    return <GroupParentComments {...groupCommentsProps} />;
  };

  // ??????, ??????, ??????, ?????? ?????? ?????????
  const renderGroupButtons = () => {
    if (!joinable) {
      return (
        <ButtonBox>
          <GrayButton onClick={onBackClick}>????????????</GrayButton>
        </ButtonBox>
      );
    }

    const { host, guests } = group as Group;
    if (host.userId === userId) {
      return (
        <ButtonBox>
          <RedButton onClick={onEditClick}>??????</RedButton>
          <GrayButton onClick={onDeleteClick}>??????</GrayButton>
        </ButtonBox>
      );
    }

    const isAlreadyJoin = guests.find((guest) => guest.userId === userId);
    return (
      <ButtonBox>
        {isAlreadyJoin ? (
          <GrayButton onClick={onExitClick}>?????????</GrayButton>
        ) : (
          <RedButton onClick={onJoinClick}>????????????</RedButton>
        )}
      </ButtonBox>
    );
  };

  if (!group) return null;

  const { startAt, endAt } = group as Group;
  const isMorning = TimeGetter(startAt);
  const dateString = DateFormatter(startAt);
  const timeString = [TimeFormatter(startAt), TimeFormatter(endAt)].join(" ~ ");
  const { joinable, badgeColor, badgeLabel } = CheckJoinable(startAt, endAt);

  return (
    <Container>
      <AlertModal {...alertMoalProps} />
      <ConfirmModal {...confirmModalProps} />
      <Header text="" />
      {renderGroupDetail()}
      {renderGroupMembers()}
      {renderGroupComments()}
      {renderGroupButtons()}
    </Container>
  );
};

export default GroupDetailPage;
