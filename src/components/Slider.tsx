import * as React from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";

interface IParams {
  speed: number;
  centeredSlides: boolean;
  pagination: { [s: string]: string | boolean };
  autoplay: { [s: string]: number | boolean };
}

interface IParamsPC {
  speed: number;
  slidesPerView: number;
  spaceBetween: number;
  pagination: { [s: string]: string | boolean };
  autoplay: { [s: string]: number | boolean };
}

interface ISliderImage {
  src: string;
}

const Slider: React.FC = () => {
  React.useEffect(() => {
    const pictures: Array<string> = [
      "/images/sr1.jpg",
      "/images/sr2.jpg",
      "/images/sr3.jpg",
      "/images/sr4.jpg",
      "/images/sr5.jpg"
    ];
    pictures.forEach((picture: string) => {
      const img: HTMLImageElement = new Image();
      img.src = picture;
    });
  }, []);

  const sliderArray: Array<ISliderImage> = [
    {
      src: "/images/sr1.jpg"
    },
    {
      src: "/images/sr2.jpg"
    },
    {
      src: "/images/sr3.jpg"
    },
    {
      src: "/images/sr4.jpg"
    },
    {
      src: "/images/sr5.jpg"
    }
  ];

  const params: IParams = {
    speed: 700,
    centeredSlides: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  };

  const pcParams: IParamsPC = {
    speed: 700,
    slidesPerView: 3,
    spaceBetween: 15,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  };

  return (
    <React.Fragment>
      <section className="slider">
        <Swiper {...params}>
          {sliderArray.map((picture: ISliderImage, index: number) => (
            <div key={index}>
              <img src={picture.src} alt="presentation" width="100%" />
            </div>
          ))}
        </Swiper>
      </section>

      <section className="pc_slider">
        <Swiper {...pcParams}>
          {sliderArray.map((picture: ISliderImage, index: number) => (
            <div key={index}>
              <img src={picture.src} alt="presentation" width="100%" />
            </div>
          ))}
        </Swiper>
      </section>
    </React.Fragment>
  );
};

export default Slider;
