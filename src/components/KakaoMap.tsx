import React from "react";
import styled from "styled-components";

interface MapProps {
  latitude: Number;
  longitude: Number;
}

const KakaoMap = ({ latitude, longitude }: MapProps) => {
  React.useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
  }, [latitude, longitude]);

  return (
    <React.Fragment>
      <MapContainer id="map"></MapContainer>
    </React.Fragment>
  );
};

const MapContainer = styled.div`
  aspect-ratio: 400/200;
`;

export default KakaoMap;
