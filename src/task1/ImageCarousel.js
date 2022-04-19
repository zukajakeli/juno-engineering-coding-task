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
    });
  }, []);

  const selectNextImage = useCallback(() => {
    setSelectedImageNumber((prev) => {
      return prev === imagesArray.length - 1 ? 0 : prev + 1;
    });
    setIsImageLoaded(false);
  }, [imagesArray]);

  const selectPrevImage = useCallback(() => {
    setSelectedImageNumber((prev) => {
      return selectedImageNumber === 0 ? imagesArray.length - 1 : prev - 1;
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
