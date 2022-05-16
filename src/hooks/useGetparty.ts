import { useState, useEffect} from 'react';
import partyAxios, { GroupInfo, initialState } from '../axios/partyAxios';

const useGetparty = (groupId:string|undefined) => {
    const [group, setGroup] = useState<GroupInfo>(initialState);
    useEffect(() => {
        const t = async () => {
            try {
                if (groupId){
                    setGroup(await partyAxios.getPartyInfo(parseInt(groupId)));
                }
            } catch (err) {
                console.log(err);
            }
        };
        t();
    },[])
    return group
}
export default useGetparty