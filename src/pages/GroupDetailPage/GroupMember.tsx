import styled from 'styled-components';
import { GroupUser } from '../../axios/groupAxios';
import { Image } from '../../elements';
import { careerUtils, characterImageUtils, yearUtils } from '../../utils/asset';

interface GroupUserProps {
  user: GroupUser;
  isHost: boolean;
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

const textProps = {
  nickname: {
    style: {
      fontWeight: 700,
      marginLeft: 5,
    },
  },
  careerAndYear: {
    style: {
      marginLeft: 5,
    },
  },
};

const GroupMember = (props: GroupUserProps) => {
  const {
    isHost,
    user: { nickname, profileImageUrl, characterImageId, careerId, yearId },
  } = props;

  const career = careerUtils.findById(careerId) as { item: string };
  const year = yearUtils.findById(yearId) as { item: string };

  return (
    <UserWrapper>
      <Image {...imageProps(profileImageUrl, characterImageId)} />
      {isHost && <HostBadge>방장</HostBadge>}
      <div {...textProps.nickname}>{nickname}</div>
      <div {...textProps.careerAndYear}>
        {career?.item} / {year?.item}
      </div>
    </UserWrapper>
  );
};

export default GroupMember;
