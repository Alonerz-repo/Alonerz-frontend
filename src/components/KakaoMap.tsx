import React from 'react';
import styled from 'styled-components';

interface MapProps {
  latitude: Number;
  longitude: Number;
  placeName: string;
}

const KakaoMap = ({ latitude, longitude, placeName }: MapProps) => {
  React.useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 4,
    };
    const map = new window.kakao.maps.Map(container, options);

    const locPosition = new window.kakao.maps.LatLng(latitude, longitude), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      message = `<div style="padding:5px;">${placeName}</div>`; // 인포윈도우에 표시될 내용입니다

    // 마커와 인포윈도우를 표시합니다
    displayMarker(locPosition, message);

    function displayMarker(locPosition: MapProps, message: any) {
      // 마커를 생성합니다
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      const iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      const infowindow = new window.kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
  }, [latitude, longitude, placeName]);

  return (
    <React.Fragment>
      <MapContainer id="map"></MapContainer>
    </React.Fragment>
  );
};

const MapContainer = styled.div`
  aspect-ratio: 400/250;
`;

export default KakaoMap;
