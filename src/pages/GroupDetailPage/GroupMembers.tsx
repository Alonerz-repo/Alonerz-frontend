import GroupMember from './GroupMember';
import { GroupUser } from '../../axios/groupAxios';
import { ContentSubTitle, Wrapper } from './styled';

interface GroupMembersProps {
  memberCount: string;
  host: GroupUser;
  guests: GroupUser[];
}

const GroupMembers = (props: GroupMembersProps) => {
  const { memberCount, host, guests } = props;

  const renderHost = () => {
    const userProps = { isHost: true, user: host };
    return <GroupMember {...userProps} />;
  };

  const renderGuests = () => {
    return guests.map((user) => {
      const userProps = { key: user.userId, isHost: false, user };
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
