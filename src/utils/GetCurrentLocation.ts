import React from "react";

const GetCurrentLocation = () => {
    const [X,setX] = React.useState<number>(0)
    const [Y,setY] = React.useState<number>(0)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function (position) {
          setX(position.coords.latitude);
          setY(position.coords.longitude);
        });
    }
    return [X,Y]
}

export default GetCurrentLocation