import GroupMember from './GroupMember';
import { GroupUser } from '../../axios/groupAxios';
import { ContentSubTitle, Wrapper } from './styled';
import { NavigateFunction } from 'react-router-dom';

interface GroupMembersProps {
  memberCount: string;
  host: GroupUser;
  guests: GroupUser[];
  navigate: NavigateFunction;
}

const GroupMembers = (props: GroupMembersProps) => {
  const { memberCount, host, guests, navigate } = props;

  const renderHost = () => {
    const userProps = { isHost: true, user: host, navigate };
    return <GroupMember {...userProps} />;
  };

  const renderGuests = () => {
    return guests.map((user) => {
      const userProps = { key: user.userId, isHost: false, user, navigate };
      return <GroupMember {...userProps} />;
    });
  };

  return (
    <Wrapper>
      <ContentSubTitle>참여인원{memberCount}</ContentSubTitle>
      {renderHost()}
      {renderGuests()}
    </Wrapper>
  );
};

export default GroupMembers;
