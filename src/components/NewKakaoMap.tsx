import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";

interface Data {
  locationX: number;
  locationY: number;
  address: string;
  placeName: string;
}

interface MapProps {
  handleMap: any;
  prevX?: number;
  prevY?: number;
}

const NewKakaoMap = ({ handleMap, prevX, prevY }: MapProps) => {
  const [X, setX] = React.useState<number>();
  const [Y, setY] = React.useState<number>();
  const [map, setMap] = React.useState<any>();
  const search = React.useRef<any>(null);
  const [keyword, setKeyword] = React.useState("");
  let markers: any[] = [];

  const markerImage = new window.kakao.maps.MarkerImage(
    "http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png",
    new window.kakao.maps.Size(28, 38)
  );

  // X, Y 좌표가 변하거나 새로운 keyword로 검색이 왔을 때 정보 받아오기
  React.useEffect(() => {
    searching();
  }, [X, Y, keyword]);

  // 현재 지도에 있는 마커들을 지우기 위함
  const removeMarkers = () => {
    for (let i = 0; i < markers.length; i++) {
      console.log(markers[i]);
      markers[i].setMap(null);
    }
    markers = [];
  };

  // key에 맞는 장소를 검색
  const searching = () => {
    if (keyword !== "") {
      removeMarkers();
      const ps = new window.kakao.maps.services.Places();
      const location = new window.kakao.maps.LatLng(X, Y);
      const radius = 3000;
      // 키워드로 장소를 검색합니다
      ps.keywordSearch(keyword, placesSearchCB, { location, radius });
    }
  };

  // 최초 지도를 초기화
  React.useEffect(() => {
    const mapContainer = document.getElementById("map"); // 지도를 표시할 div

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setX(position.coords.latitude);
        setY(position.coords.longitude);
        const mapOption = {
          center: new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          ), // 지도의 중심좌표
          level: 4,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 지도가 dragend되었을 때 X,Y 상태값 변화
        window.kakao.maps.event.addListener(map, "dragend", function () {
          // 지도 중심좌표를 얻어옵니다
          const center = map.getCenter();
          setX(center.getLat());
          setY(center.getLng());
        });
        setMap(map);
      });
    }

    // X,Y값을 상위 컴포넌트로 받아온다면 현재 위치가 아닌 해당 위치로
    // 현재위치를 받아오기 전에 실행할 필요가 있어보임
    if (prevX && prevY) {
    }
  }, []);

  // 장소를 검색하고 결과를 data로 받아옴
  function placesSearchCB(data: any, status: any) {
    if (status === window.kakao.maps.services.Status.OK) {
      for (let i = 0; i < data.length; i++) {
        searchDisplayMarker(data[i]);
      }
    }
  }

  // 검색한 결과를 하나씩 받아 marker를 표시
  function searchDisplayMarker(place: any) {
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
      image: markerImage,
    });

    // 검색된 마커를 마커 배열에 저장 (추후 마커를 지우기 위해)
    markers.push(marker);

    const iwContent = "", // 인포윈도우에 표시할 내용
      iwRemoveable = true;

    // 인포윈도우를 생성합니다
    const infowindow = new window.kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 마커에 클릭이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, "click", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>"
      );
      infowindow.open(map, marker);
      // 클릭한 장소를 모임 장소로 설정
      handleMap(
        Number(place.y),
        Number(place.x),
        place.address_name,
        place.place_name
      );
    });
  }

  const handleSearch = () => {
    setKeyword(search.current.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <React.Fragment>
      <MapContainer id="map"></MapContainer>
      <Wrap>
        <SearchInput ref={search} onKeyPress={handleKeyPress}></SearchInput>
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </Wrap>
    </React.Fragment>
  );
};

const MapContainer = styled.div`
  aspect-ratio: 400/250;
  z-index: 0;
`;

const Wrap = styled.div`
  margin: 10px 0px 10px 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 3;
`;

const SearchInput = styled.input`
  font-size: 12px;
  padding: 3px;
  outline: none;
  width: 40%;
`;

const SearchButton = styled.div`
  width: 50px;
  height: 30px;
  border: 0px;
  background: #1b5ac2;
  outline: none;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export default NewKakaoMap;
