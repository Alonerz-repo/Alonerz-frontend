import React from 'react';
import { GroupUser } from '../../axios/groupAxios';
import { Grid, Text } from '../../elements';
import GroupMember from './GroupMember';

interface GroupMembersProps {
  memberCount: string;
  host: GroupUser;
  guests: GroupUser[];
}

const textProps = {
  memberCount: {
    bold: true,
    type: 'line',
    titleText: '모집인원',
  },
};

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
    <Grid padding="20px">
      <Text {...textProps.memberCount}>{memberCount}</Text>
      {renderHost()}
      {renderGuests()}
    </Grid>
  );
};

export default GroupMembers;
