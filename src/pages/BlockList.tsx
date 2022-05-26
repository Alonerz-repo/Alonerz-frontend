import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Image, Grid, Text } from '../elements';
import userAxios from '../axios/userAxios';
import Header from '../components/Header';
import AlertModal from '../components/AlertModal';
import { useNavigate } from 'react-router-dom';
import CareerModule from '../assets/career';

const Position = styled.div`
  position: absolute;
  right: 20px;
`;

const alertInit = {
  message: '',
  closeLabel: '',
  onClose: () => {},
};

const BlockList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(alertInit);
  useEffect(() => {
    const getBlockList = async () => {
      await userAxios.getBlockList().then((res) => setUsers(res.data.users));
    };
    getBlockList();
  }, []);

  const setBlock = (userId: any) => {
    try {
      userAxios.setblockUser(userId).then((res) =>
        setAlert({
          message: '차단이 해제되었습니다.',
          closeLabel: '닫기',
          onClose: () => setAlert(alertInit),
        }),
      );

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <Header text="차단목록" />
      <AlertModal {...alert} />
      {users.map((user, key) => {
        const { userId, nickname, imageUrl, careerId } = user;
        const career = CareerModule.findById(careerId);
        return (
          <Grid key={key}>
            <Grid display="flex" padding="20px 20px">
              <Image size="44px" src={imageUrl}></Image>
              <Grid padding="3px 14px">
                <Text>{nickname}</Text>
                <Text>
                  {career?.group} / {career?.item}
                </Text>
              </Grid>
              <Position>
                <button
                  style={{
                    border: '2px solid #F5F5F5',
                    borderRadius: '30px',
                    padding: '15px 20px',
                    background: '#FFFFFF',
                    color: '#BDBDBD',
                  }}
                  onClick={() => setBlock(userId)}
                >
                  차단해제
                </button>
              </Position>
            </Grid>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default BlockList;
