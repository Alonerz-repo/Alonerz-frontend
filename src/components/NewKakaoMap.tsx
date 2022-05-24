import React from "react";
import styled from "styled-components";

const NewKakaoMap = () => {
  const [X, setX] = React.useState<number>();
  const [Y, setY] = React.useState<number>();
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

  const markerImage = new window.kakao.maps.MarkerImage(
    "http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png",
    new window.kakao.maps.Size(28, 38)
  );
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
export default NewKakaoMap;
