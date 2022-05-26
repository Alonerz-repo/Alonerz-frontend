import lunchImage from "./lunch.png";
import dinnerImage from "./dinner.png";
import LeftArrow from "./arrow-left.svg";
import RightArrow from "./arrow-right.svg";

class CardImages {
  constructor(
    public readonly lunch: string = lunchImage,
    public readonly dinner: string = dinnerImage,
  ) {}
}

export const CardImagesModule = new CardImages();

class IconImages {
  constructor(
    public readonly LeftArrowIcon: string = LeftArrow,
    public readonly RightArrowIcon: string = RightArrow,
  ) {}
}

export const IconImageModule = new IconImages();
