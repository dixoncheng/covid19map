import styled from "styled-components";
import * as gtag from "lib/gtag";

const StyledAlert = styled.div`
  padding: 3px 20px;
  color: white !important;
  font-size: 14px;
  background: #ffcd38;
  margin: -20px -20px 10px;
  display: block;
  a {
    color: white !important;
  }
`;

export interface IProps {
  data: string;
}

const Alert = ({ data }: IProps) => (
  <StyledAlert
    onClick={() => gtag.event("Alert", "", "")}
    dangerouslySetInnerHTML={{
      __html: data,
    }}
  />
);

export default Alert;
