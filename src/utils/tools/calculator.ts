export interface JoinableState {
  joinable: boolean;
  badgeLabel: string;
  badgeColor: string;
}

const defaultJoinablestate = {
  joinable: false,
  badgeLabel: "",
  badgeColor: "#fff",
};

// D-day 계산
export const CheckJoinable = (startAt: Date, endAt: Date): JoinableState => {
  const now = new Date().getTime();
  const startTime = new Date(startAt).getTime();
  const endTime = new Date(endAt).getTime();

  if (now < startTime) {
    const diffMinute = Math.ceil((startTime - now) / (1000 * 60));
    const diffHour = Math.ceil(diffMinute / 60);
    const diffDays = Math.ceil(diffHour / 60);
    const joinable = true;
    const badgeColor = "#fbb631";
    let badgeLabel: string;

    if (diffMinute < 60) {
      badgeLabel = `${diffMinute}분 후`;
    } else if (diffHour < 24) {
      badgeLabel = `${diffHour}시간 후`;
    } else {
      badgeLabel = `D-${diffDays}`;
    }

    return { joinable, badgeLabel, badgeColor };
  }

  const joinable = true;
  if (now >= startTime && now <= endTime) {
    const badgeLabel = "진행중";
    const badgeColor = "#33b700";
    return { joinable, badgeLabel, badgeColor };
  }

  if (now > endTime) {
    const diffMinute = Math.abs(Math.ceil((endTime - now) / (1000 * 60)));
    const diffHour = Math.ceil(diffMinute / 60);
    const diffDays = Math.ceil(diffHour / 60);
    const badgeColor = "#959595";
    let after: string;
    if (diffMinute < 60) {
      after = `${diffMinute}분 전`;
    } else if (diffHour < 24) {
      after = `${diffHour}시간 전`;
    } else {
      after = `D+${diffDays}`;
    }
    const badgeLabel = `종료(${after})`;

    return { joinable, badgeLabel, badgeColor };
  }

  return defaultJoinablestate;
};
