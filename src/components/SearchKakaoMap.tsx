import React from "react";
import styled from "styled-components";

interface MapProps {
  locationX?: number;
  locationY?: number;
  handlePlacename?: any;
  handleLocationX?: any;
  handleLocationY?: any;
  handleAddress?: any;
}

const SearchKakaoMap = ({
  locationX,
  locationY,
  handlePlacename,
  handleLocationX,
  handleLocationY,
  handleAddress,
}: MapProps) => {
  const search = React.useRef<any>(null);
  const [keyword, setKeyword] = React.useState("");

  const handleSearch = () => {
    setKeyword(search.current.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  React.useEffect(() => {
    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      };

    const markers: any[] = [];
    let tmpInfowindow: any = null;
    const markerImage = new window.kakao.maps.MarkerImage(
      "http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png",
      new window.kakao.maps.Size(28, 38)
    );

    const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        const locPosition = new window.kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = "<div>현재 위치</div>"; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);

        if (locationX && locationY) {
          const placeLoc = new window.kakao.maps.LatLng(locationX, locationY);
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: placeLoc,
            image: markerImage,
          });
          // const bounds = new window.kakao.maps.LatLngBounds(
          //   locPosition,
          //   placeLoc
          // );
          // map.setBounds(bounds);
        }

        if (keyword === "") {
          return;
        }

        const ps = new window.kakao.maps.services.Places();
        let location = new window.kakao.maps.LatLng(lat, lon);
        let radius = 3000;
        // 키워드로 장소를 검색합니다
        ps.keywordSearch(keyword, placesSearchCB, { location, radius });
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      const locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";

      displayMarker(locPosition, message);
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition: any, message: string) {
      const imageSrc = "https://i1.daumcdn.net/dmaps/apis/n_local_blit_04.png",
        imageSize = new window.kakao.maps.Size(31, 35);

      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize
      );
      // 마커를 생성합니다
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage,
      });

      marker.setZIndex(2);

      //   const iwContent = message, // 인포윈도우에 표시할 내용
      //     iwRemoveable = true;

      //   // 인포윈도우를 생성합니다
      //   const infowindow = new window.kakao.maps.InfoWindow({
      //     content: iwContent,
      //     removable: iwRemoveable,
      //   });

      //   // 인포윈도우를 마커위에 표시합니다
      //   infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }

    function placesSearchCB(data: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new window.kakao.maps.LatLngBounds();
        if (markers.length === 1) {
          markers[0].setVisible(false);
          markers.pop();
          handleAddress("");
          handlePlacename("");
        }

        for (let i = 0; i < data.length; i++) {
          searchDisplayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function searchDisplayMarker(place: any) {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
      });

      const iwContent = "", // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      const infowindow = new window.kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 마커에 클릭이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, "click", function () {
        if (tmpInfowindow) {
          tmpInfowindow.close();
        }
        if (markers.length === 1) {
          markers[0].setVisible(false);
          markers.pop();
        }
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
        tmpInfowindow = infowindow;
        handlePlacename(place.place_name);
        handleLocationX(place.y);
        handleLocationY(place.x);
        handleAddress(place.address_name);
      });
    }

    window.kakao.maps.event.addListener(
      map,
      "click",
      function (mouseEvent: any) {
        const marker = new window.kakao.maps.Marker(); // 클릭한 위치를 표시할 마커입니다
        searchDetailAddrFromCoords(
          mouseEvent.latLng,
          function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              if (tmpInfowindow) {
                tmpInfowindow.close();
              }

              if (markers.length === 1) {
                markers[0].setVisible(false);
                markers.pop();
              }

              handleAddress(
                result[0].address
                  ? result[0].address.address_name
                  : result[0].road_address.address_name
              );
              handleLocationX(mouseEvent.latLng.getLat());
              handleLocationY(mouseEvent.latLng.getLng());
              handlePlacename("나만의 장소");

              // 마커를 클릭한 위치에 표시합니다
              marker.setPosition(mouseEvent.latLng);
              marker.setImage(markerImage);
              marker.setMap(map);
              markers.push(marker);
              const infowindow = new window.kakao.maps.InfoWindow({
                removable: true,
              });
              infowindow.setContent(
                '<div style="padding:5px;font-size:12px;">나만의 장소</div>'
              );
              infowindow.open(map, marker);
              tmpInfowindow = infowindow;
            }
          }
        );
      }
    );

    function searchDetailAddrFromCoords(coords: any, callback: any) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
  }, [keyword]);

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

const SearchButton = styled.button`
  width: 50px;
  height: 30px;
  border: 0px;
  background: #1b5ac2;
  outline: none;
  color: #ffffff;
`;

export default SearchKakaoMap;
