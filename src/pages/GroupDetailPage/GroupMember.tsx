import { NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';
import { GroupUser } from '../../axios/groupAxios';
import { Image } from '../../elements';
import { careerUtils, characterImageUtils, yearUtils } from '../../utils/asset';
import { UserItem } from './styled';

interface GroupUserProps {
  user: GroupUser;
  isHost: boolean;
  navigate: NavigateFunction;
}

const UserWrapper = styled.div`
  vertical-align: middle;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px 0;
`;

const HostBadge = styled.div`
  width: 33px;
  background-color: gray;
  border-radius: 3px;
  margin: 0 0 0 10px;
  padding: 3px;
  text-align: center;
  color: #fff;
`;

const imageProps = (imageUrl: string, characterImageId: number) => ({
  shape: 'circle',
  size: '30px',
  src: imageUrl
    ? imageUrl
    : characterImageUtils.findById(characterImageId)?.url,
});

const nicknameProps = (userId: string, navigate: NavigateFunction) => ({
  style: {
    fontWeight: 700,
    cursor: 'pointer',
  },
  onClick: () => {
    navigate(`/user/${userId}`);
  },
});

const GroupMember = (props: GroupUserProps) => {
  const { isHost, user, navigate } = props;

  const {
    userId,
    nickname,
    profileImageUrl,
    characterImageId,
    careerId,
    yearId,
  } = user;

  const career = careerUtils.findById(careerId) as { item: string };
  const year = yearUtils.findById(yearId) as { item: string };

  return (
    <UserWrapper>
      <Image {...imageProps(profileImageUrl, characterImageId)} />
      {isHost && <HostBadge>방장</HostBadge>}
      <UserItem {...nicknameProps(userId, navigate)}>{nickname}</UserItem>
      <UserItem>
        {career?.item} / {year?.item}
      </UserItem>
    </UserWrapper>
  );
};

export default GroupMember;
