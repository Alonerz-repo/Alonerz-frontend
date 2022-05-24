/* 작업자 : 최원영 */

import React from 'react';
import Header from '../../components/Header';
import KakaoMap from '../../components/KakaoMap';
import { Grid, Image, Text } from '../../elements';

interface GroupDetailProps {
  title: string;
  categoryId: number;
  imageUrl: string | null;
  datetime: string;
  description: string | null;
  locationX: number;
  locationY: number;
  address: string;
  placeName: string;
  createdAt: string;
  updatedAt: string;
}

const textProps = {
  title: (title: string) => ({
    bold: true,
    type: 'title',
    titleText: title,
    margin: '0 0 5px 0',
  }),
  address: {
    type: 'line',
    titleText: '장소',
    margin: '5px 0',
  },
  datetime: {
    bold: true,
    type: 'line',
    titleText: '모임일시',
    margin: '5px 0',
  },
  description: {
    bold: true,
    type: 'area',
    titleText: '추가내용',
    margin: '5px 0',
  },
  memberCount: {
    bold: true,
    type: 'line',
    titleText: '모집인원',
    margin: '10px 0 5px',
  },
};

const defailtImageUrl = '';
const imageProps = (imageUrl: string) => ({
  shape: 'rectangle',
  src: imageUrl ? imageUrl : defailtImageUrl,
});

const GroupDetail = (props: GroupDetailProps) => {
  const {
    title,
    imageUrl,
    address,
    description,
    datetime,
    locationX,
    locationY,
    placeName,
  } = props;
  return (
    <React.Fragment>
      <Header text="파티참가" />
      <Image {...imageProps(imageUrl as string)} />
      <Grid padding="20px">
        <Text {...textProps.title(title)} />
        <Text {...textProps.address}>{address}</Text>
        <KakaoMap
          latitude={locationX}
          longitude={locationY}
          placeName={placeName}
        />
        {/* 음식 카테고리 */}
        <Text {...textProps.datetime}>{datetime}</Text>
        <Text {...textProps.description}>{description}</Text>
      </Grid>
    </React.Fragment>
  );
};

export default GroupDetail;
