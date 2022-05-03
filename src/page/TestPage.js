import React from "react";
import { actionCreators as userActions } from "../redux/modules/user";
import { useSelector, useDispatch } from "react-redux";
import Upload from '../Upload'
import {Image} from '../element'
import KakaoMap from '../KakaoMap'

const TestPage = () => {
  const preview = useSelector((state) => state.image.preview)
  const test = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const handleAction = () => {
    const career = {
      part: "q",
      year: "w",
      description:"d"
    }
    dispatch(userActions.deleteCareerBE(0))
  }

  React.useEffect(() => {
    console.log(test)
  })

  return (
  <React.Fragment>
    {/* <Upload/>
    <Image src={preview} /> */}
    {/* <KakaoMap/> */}
    <button onClick={handleAction}>test_button</button>
  </React.Fragment>
  );
};

export default TestPage;