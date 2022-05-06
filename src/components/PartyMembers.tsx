import React from "react";
import PartyMember from "./PartyMember";

const PartyMembers = () => {
  return (
    <React.Fragment>
      <PartyMember captain nickname="nickname" part="a" year="3"></PartyMember>
      <PartyMember nickname="nickname" part="b" year="2"></PartyMember>
      <PartyMember nickname="nickname" part="c" year="1"></PartyMember>
    </React.Fragment>
  );
};

export default PartyMembers;
