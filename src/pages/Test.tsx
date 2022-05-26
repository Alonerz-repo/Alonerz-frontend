import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

const Test = () => {
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];
  function Item(props: any) {
    return (
      <>
        <Paper>
          <h2>{props.item.name}</h2>
          <p>{props.item.description}</p>

          <Button className="CheckButton">Check it out!</Button>
        </Paper>
      </>
    );
  }

  return (
    <React.Fragment>
      <Carousel
        autoPlay={false}
        animation="slide"
        swipe={true}
        indicators={true}
        // next={(next, active) =>
        //   console.log(`we left ${active}, and are now at ${next}`)
        // }
        // prev={(prev, active) =>
        //   console.log(`we left ${active}, and are now at ${prev}`)
        // }
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </React.Fragment>
  );
};
export default Test;
