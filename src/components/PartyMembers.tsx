import React from "react";
import PartyMember from "./PartyMember";

const PartyMembers = () => {
    return (
        <React.Fragment>
            <PartyMember captain part="a" year="3"></PartyMember>
            <PartyMember part="b" year="2"></PartyMember>
            <PartyMember part="c" year="1"></PartyMember>
        </React.Fragment>
    )
}

export default PartyMembers