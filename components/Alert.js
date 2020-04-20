// import { useEffect } from "react";
import styled from "styled-components";

const Alert = ({ data }) => {
  // useEffect(() => {
  //   console.log("changed");
  // }, [data]);
  return (
    <StyledAlert>
      <div
        onClick={() => gtag.event("Alert", "", "")}
        dangerouslySetInnerHTML={{
          __html: data,
        }}
      />
      {/* <a
        href="https://covid19.govt.nz/assets/resources/tables/COVID-19-alert-levels-detailed.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Alert Level 4
      </a> */}
    </StyledAlert>
  );
};

export default Alert;

const StyledAlert = styled.div`
  padding: 3px 20px;
  color: white !important;
  font-size: 14px;
  background: #ffcd38;
  /* url(/alert.svg) 100% 50% no-repeat; */
  margin: -20px -20px 10px;
  display: block;
  a {
    color: white;
  }
`;
