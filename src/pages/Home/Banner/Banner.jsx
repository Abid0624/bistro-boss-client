import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import img1 from "../../../assets/home/02.jpg";
import img2 from "../../../assets/home/01.jpg";
import img3 from "../../../assets/home/03.png";
import img4 from "../../../assets/home/04.jpg";
import img5 from "../../../assets/home/05.png";
import img6 from "../../../assets/home/06.png";

const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={3000}
      stopOnHover={false}
      showStatus={false}
      showIndicators={true}
    >
      <div>
        <img src={img1} alt="Slide 1" />
      </div>
      <div>
        <img src={img2} alt="Slide 2" />
      </div>
      <div>
        <img src={img3} alt="Slide 3" />
      </div>
      <div>
        <img src={img4} alt="Slide 4" />
      </div>
      <div>
        <img src={img5} alt="Slide 5" />
      </div>
      <div>
        <img src={img6} alt="Slide 6" />
      </div>
    </Carousel>
  );
};

export default Banner;
