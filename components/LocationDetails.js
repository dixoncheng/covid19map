import styled, { css, withTheme } from "styled-components";
import RegionAgeGenderChart from "../components/RegionAgeGenderChart";
import RegionOverseasChart from "../components/RegionOverseasChart";

const LocationDetails = ({ location, data }) => {
  const [regionAgesGenders, regionOverseas, dhbUrl] = data;
  return (
    <StyledLocationDetails>
      <div className="details">
        <hr />
        {regionAgesGenders && regionAgesGenders[location] && (
          <RegionAgeGenderChart data={regionAgesGenders[location]} />
        )}
        {regionAgesGenders &&
          regionAgesGenders[location] &&
          regionOverseas[location] && <hr />}
        {regionOverseas && regionOverseas[location] && (
          <RegionOverseasChart data={regionOverseas[location]} />
        )}
        {dhbUrl && (
          <>
            <hr />
            <a
              className="dhb-link"
              href={dhbUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => gtag.event("DHB link", "", location)}
            >
              View DHB updates
            </a>
          </>
        )}
      </div>
    </StyledLocationDetails>
  );
};

export default withTheme(LocationDetails);

const StyledLocationDetails = styled.div`
  ${({ theme, ...props }) => css``}
`;
