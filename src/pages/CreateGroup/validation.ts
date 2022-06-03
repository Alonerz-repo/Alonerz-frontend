export const Available = {
    checkImage : (str : string) => {
        if (str ==='jpeg') return false
        if (str ==='png') return false
        if (str ==='jpg') return false
        return true;
    },

    checkDate : (data:any, setError:any) => {
        if (new Date(data.date.setHours(data.startAt ?? 0, 0, 0)) < new Date()) {
            setError("startAt", {
              type: "time",
              message: "현재 날짜, 시간 이전에는 그룹을 생성할 수 없습니다.",
            });
            return;
          }
    }
}