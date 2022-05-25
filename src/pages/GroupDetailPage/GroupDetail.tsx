/* 작업자 : 최원영 */

import React from 'react';
import styled from 'styled-components';
import KakaoMap from '../../components/KakaoMap';
import { Image } from '../../elements';
import { categoryUtils } from '../../utils/asset';
import {
  CategoryBadge,
  ContentBox,
  ContentField,
  ContentItem,
  ContentTitle,
  DayBadge,
  Wrapper,
} from './styled';

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

const defailtImageUrl = '';
const imageProps = (imageUrl: string) => ({
  shape: 'rectangle',
  src: imageUrl ? imageUrl : defailtImageUrl,
});

const contents = (props: GroupDetailProps) => [
  { field: '장소', item: props.address },
  { field: '날짜', item: props.dateString },
  { field: '시간', item: props.timeString },
  {
    field: '상세내용',
    item: props.description,
    contentBoxProps: {
      style: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      } as React.CSSProperties,
    },
    contentItemProps: {
      style: {
        width: '-webkit-fill-available',
        padding: '20px 10px',
        margin: '10px 0 0',
        border: '1px solid #ddd',
        borderRadius: '7px',
      } as React.CSSProperties,
    },
  },
];

const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

const GroupDetail = (props: GroupDetailProps) => {
  const { title, imageUrl, dDay, categoryId, locationX, locationY, placeName } =
    props;

  return (
    <React.Fragment>
      <Image {...imageProps(imageUrl as string)} />
      <Wrapper>
        <BadgeWrapper>
          <DayBadge>{dDay}</DayBadge>
          <CategoryBadge>
            {categoryUtils.findById(categoryId)?.item}
          </CategoryBadge>
        </BadgeWrapper>
        <ContentTitle>{title}</ContentTitle>
        <KakaoMap
          latitude={locationX}
          longitude={locationY}
          placeName={placeName}
        />
        {contents(props).map((content) => {
          const { field, item, contentBoxProps, contentItemProps } = content;
          return (
            <ContentBox {...contentBoxProps}>
              <ContentField>{field}</ContentField>
              <ContentItem {...contentItemProps}>{item}</ContentItem>
            </ContentBox>
          );
        })}
      </Wrapper>
    </React.Fragment>
  );
};

export default GroupDetail;
