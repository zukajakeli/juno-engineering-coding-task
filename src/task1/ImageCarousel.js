import React, { useEffect, useState, useCallback } from "react";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

import { fetchImageUrls } from "../api/index";

import "./styles.css";

const ImageCarousel = (props) => {
  const [imagesArray, setImagesArray] = useState([]);
  const [selectedImageNumber, setSelectedImageNumber] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    fetchImageUrls().then((res) => {
      setImagesArray(res);
      const nextImg = new Image();
      const prevImg = new Image();
      nextImg.src = res[1];
      prevImg.src = res[res.length - 1];

      setIsImageLoaded(true);
    });
    setSelectedImageNumber(0);
  }, []);

  const selectNextImage = useCallback(() => {
    setSelectedImageNumber((prev) => {
      const img = new Image();
      if (prev === imagesArray.length) {
        img.src = imagesArray[1];
        return 0;
      } else {
        img.src = imagesArray[prev + 2];
        return prev + 1;
      }
    });
    setIsImageLoaded(false);
  }, [imagesArray]);

  const selectPrevImage = useCallback(() => {
    setSelectedImageNumber((prev) => {
      const img = new Image();

      if (selectedImageNumber === 0) {
        img.src = imagesArray[imagesArray.length - 2];
        return imagesArray.length - 1;
      } else {
        img.src = imagesArray[prev - 2];
        return prev - 1;
      }
    });
    setIsImageLoaded(false);
  }, [imagesArray, selectedImageNumber]);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  return (
    <div className="carousel">
      <ArrowCircleLeftOutlinedIcon
        className="prev-button"
        onClick={selectPrevImage}
      />
      {isImageLoaded ? null : <HourglassBottomOutlinedIcon />}
      <img
        className={
          isImageLoaded
            ? "selected-image"
            : "selected-image selected-image--hidden"
        }
        alt="caroussel"
        src={imagesArray[selectedImageNumber]}
        onLoad={handleImageLoad}
      />
      <ArrowCircleRightOutlinedIcon
        className="next-button"
        onClick={selectNextImage}
      />
    </div>
  );
};
export default ImageCarousel;
