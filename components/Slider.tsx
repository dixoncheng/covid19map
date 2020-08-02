import styled, { css } from "styled-components";
import Slider from "react-slick";

const StyledSlider = styled.div<{ full: boolean; padding?: number }>`
  ${({ theme, full, padding }) => css`
    margin: ${full ? "0 -20px 0 !important" : 0};
    padding: ${padding ? "1em 0 0 0" : 0};
    .slick-slider {
      position: relative;

      display: block;
      box-sizing: border-box;

      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      -webkit-touch-callout: none;
      -khtml-user-select: none;
      -ms-touch-action: pan-y;
      touch-action: pan-y;
      -webkit-tap-highlight-color: transparent;
    }

    .slick-list {
      position: relative;

      display: block;
      overflow: hidden;

      margin: 0;
      padding: 0;
    }
    .slick-list:focus {
      outline: none;
    }
    .slick-list.dragging {
      cursor: pointer;
      cursor: hand;
    }

    .slick-slider .slick-track,
    .slick-slider .slick-list {
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      -ms-transform: translate3d(0, 0, 0);
      -o-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    .slick-track {
      position: relative;
      top: 0;
      left: 0;

      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    .slick-track:before,
    .slick-track:after {
      display: table;

      content: "";
    }
    .slick-track:after {
      clear: both;
    }
    .slick-loading .slick-track {
      visibility: hidden;
    }

    .slick-slide {
      display: none;
      float: left;

      height: 100%;
      min-height: 1px;
      /* slide gap */
      > div {
        margin: 0 1em;
      }
    }
    [dir="rtl"] .slick-slide {
      float: right;
    }
    .slick-slide img {
      display: block;
    }
    .slick-slide.slick-loading img {
      display: none;
    }
    .slick-slide.dragging img {
      pointer-events: none;
    }
    .slick-initialized .slick-slide {
      display: block;
    }
    .slick-loading .slick-slide {
      visibility: hidden;
    }
    .slick-vertical .slick-slide {
      display: block;

      height: auto;

      border: 1px solid transparent;
    }

    /* Dots */
    .slick-dotted.slick-slider {
      margin-bottom: 30px;
    }

    .slick-dots {
      display: block;
      width: 100%;
      padding: 0;
      margin: 1em 0 0 0;
      list-style: none;
      text-align: center;
    }
    .slick-dots li {
      position: relative;
      display: inline-block;
      width: 14px;
      height: 14px;
      margin: 0 1px;
      padding: 0;
      cursor: pointer;
    }
    .slick-dots li button {
      font-size: 0;
      line-height: 0;
      display: block;
      width: 100%;
      height: 100%;
      cursor: pointer;
      color: transparent;
      border: 0;
      outline: none;
      background: transparent;
    }
    .slick-dots li button:hover,
    .slick-dots li button:focus {
      outline: none;
    }
    .slick-dots li button:hover:before,
    .slick-dots li button:focus:before {
      opacity: 1;
    }
    .slick-dots li button:before {
      font-size: 23px;
      line-height: 12px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: "•";
      text-align: center;
      opacity: 0.25;
      color: ${theme.navy};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .slick-dots li.slick-active button:before {
      opacity: 0.75;
      color: ${theme.navy};
    }

    .slick-left,
    .slick-right {
      display: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      @media (min-width: ${theme.md}px) {
        display: block;
      }
    }
    .slick-left {
      left: 0;
    }
    .slick-right {
      right: 0;
    }
  `}
`;

const SliderWrap = ({
  full,
  padding = 0,
  children,
  centerPadding,
  ...props
}: {
  full: boolean;
  padding?: number;
  children: React.ReactNode;
  centerPadding?: string;
}) => (
  <StyledSlider full={full} padding={padding}>
    {/* @ts-ignore */}
    <Slider
      centerMode
      centerPadding={centerPadding || "18px"}
      infinite={false}
      dots
      arrows={false}
      {...props}
    >
      {children}
    </Slider>
  </StyledSlider>
);

export default SliderWrap;
