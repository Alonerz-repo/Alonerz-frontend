import lunchImage from "./lunch.png";
import dinnerImage from "./dinner.png";

class CardImages {
  constructor(
    public readonly lunch: string = lunchImage,
    public readonly dinner: string = dinnerImage,
  ) {}
}

export default new CardImages();
