/* 작업자 : 최원영 */

import React from 'react';
import styled from 'styled-components';
import KakaoMap from '../../components/KakaoMap';
import { Grid, Image, Text } from '../../elements';
import { categoryUtils } from '../../utils/asset';
import { CategoryBadge, ContentTitle, DayBadge } from './styled';

interface GroupDetailProps {
  title: string;
  dDay: string;
  categoryId: number;
  imageUrl: string | null;
  dateString: string;
  timeString: string;
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
  date: {
    bold: true,
    type: 'line',
    titleText: '날짜',
    margin: '5px 0',
  },
  time: {
    bold: true,
    type: 'line',
    titleText: '시간',
    margin: '5px 0',
  },
  description: {
    bold: true,
    type: 'area',
    titleText: '상세내용',
    margin: '5px 0',
  },
  memberCount: {
    bold: true,
    type: 'line',
    titleText: '참여인원',
    margin: '10px 0 5px',
  },
};

const defailtImageUrl = '';
const imageProps = (imageUrl: string) => ({
  shape: 'rectangle',
  src: imageUrl ? imageUrl : defailtImageUrl,
});

const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

const GroupDetail = (props: GroupDetailProps) => {
  const {
    title,
    imageUrl,
    dDay,
    categoryId,
    address,
    dateString,
    timeString,
    description,
    locationX,
    locationY,
    placeName,
  } = props;
  return (
    <React.Fragment>
      <Image {...imageProps(imageUrl as string)} />
      <Grid padding="20px">
        <BadgeWrapper>
          <DayBadge>{dDay}</DayBadge>
          <CategoryBadge>
            {categoryUtils.findById(categoryId)?.item}
          </CategoryBadge>
        </BadgeWrapper>
        <ContentTitle>{title}</ContentTitle>
        <Text {...textProps.address}>{address}</Text>
        <KakaoMap
          latitude={locationX}
          longitude={locationY}
          placeName={placeName}
        />
        <Text {...textProps.date}>{dateString}</Text>
        <Text {...textProps.time}>{timeString}</Text>
        <Text {...textProps.description}>{description}</Text>
      </Grid>
    </React.Fragment>
  );
};

export default GroupDetail;
