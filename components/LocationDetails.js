import styled, { css, withTheme } from "styled-components";
import RegionAgeGenderChart from "../components/RegionAgeGenderChart";
import RegionOverseasChart from "../components/RegionOverseasChart";
import LocationBar from "../components/LocationBar";
import Legend from "../components/Legend";

const LocationDetails = ({ location, data }) => {
  const [regionAgesGenders, regionOverseas, dhbUrl, history] = data;

  console.log(location);
  console.log(data);
  return (
    <>
      {/* <Legend /> */}
      <StyledLocationDetails>
        {/* <LocationBar location={location} history={history} /> */}
        <div className="details">
          <hr />
          {regionAgesGenders && (
            <RegionAgeGenderChart data={regionAgesGenders} />
          )}

          {regionAgesGenders && regionOverseas && <hr />}

          {regionOverseas && <RegionOverseasChart data={regionOverseas} />}
          {dhbUrl && (
            <>
              <hr />
              <a
                className="dhb-link"
                href={dhbUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => gtag.event("DHB link", "", location.name)}
              >
                View DHB updates
              </a>
            </>
          )}
        </div>
      </StyledLocationDetails>
    </>
  );
};

export default withTheme(LocationDetails);

const StyledLocationDetails = styled.div`
  ${({ theme, ...props }) => css``}
`;
