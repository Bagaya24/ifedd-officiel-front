import React, { useState } from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, FiberManualRecord } from "@mui/icons-material";

const CustomArrow = ({ direction, onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "45%",
      [direction === "left" ? "left" : "right"]: 0,
      zIndex: 1,
      bgcolor: "white",
      boxShadow: 2,
      "&:hover": {
        bgcolor: "#f5f5f5",
      },
    }}
  >
    {direction === "left" ? <ArrowBackIos /> : <ArrowForwardIos />}
  </IconButton>
);

const CustomCarousel = ({ slide, title }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerPage = 3;

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: slidesPerPage,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const totalPages = Math.ceil(slide.length / slidesPerPage);

  return (
    <>
      <Typography
        variant="h3"
        color="#1769aa"
        align="center"
        sx={{ mt: 5, mb: 3, fontWeight: 600 }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          width: "90%",
          margin: "auto",
          mt: 5,
          position: "relative",
          "& .slick-slide > div": {
            px: 1.5, // Ajoute padding horizontal (ou mx pour margin horizontal)
          },
        }}
      >
        <Slider {...settings}>{slide}</Slider>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => {
            const dotIndex = i;
            const isActive = Math.floor(currentSlide / slidesPerPage) === dotIndex;

            return (
              <FiberManualRecord
                key={i}
                sx={{
                  fontSize: 12,
                  color: isActive ? "#1769aa" : "#ccc",
                  cursor: "default",
                }}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default CustomCarousel;
