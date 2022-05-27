
export const Available = {
    checkImage : (str : string) => {
        if (str ==='jpeg') return false
        if (str ==='png') return false
        if (str ==='jpg') return false
        return true;
    }
}