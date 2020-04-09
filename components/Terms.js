import styled, { css } from "styled-components";

const Terms = ({ termsOpened, setTermsOpened }) => {
  return (
    <StyledTerms>
      <p>
        <small>
          We are working with the official information released by the{" "}
          <a
            href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ministry of Health
          </a>
          . Confirmed cases are listed by District Health Board regions.
        </small>
      </p>

      <p>
        <small>
          Any feedback, ideas, or if you'd like to help, please contact{" "}
          <a href="mailto:contact@covid19map.nz">contact@covid19map.nz</a> |{" "}
          <a
            href="https://github.com/dixoncheng/covid19map"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <br />
          <LinkButton
            type="button"
            onClick={() => setTermsOpened(!termsOpened)}
          >
            Disclaimer and Terms of use
          </LinkButton>
        </small>
      </p>
      {termsOpened && (
        <div>
          <p>
            <small>
              Covid-19 Map NZ sources its cases directly from the official{" "}
              <a
                href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-cases"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ministry of Health page
              </a>
              . We are in no way responsible for the accuracy of this
              information.
            </small>
          </p>
          <p>
            <small>
              Covid-19 Map NZ disclaims and excludes all liability for any
              claim, loss, demand or damages of any kind whatsoever (including
              for negligence) arising out of or in connection with the use of
              either this website or the information, content or materials
              included on this site or on any website we link to.
            </small>
          </p>
          <p>
            <small>
              By viewing and using the site, you will be deemed to agree to
              these Terms of use.
            </small>
          </p>
        </div>
      )}
      <p className="made-by">
        <small>Made by</small>{" "}
        <a
          href="https://www.linkedin.com/in/emilywongnz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/linkedin.svg" />
        </a>{" "}
        <a
          href="https://www.linkedin.com/in/dixon-cheng/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/linkedin.svg" />
        </a>
      </p>
    </StyledTerms>
  );
};

export default Terms;

const StyledTerms = styled.div`
  ${({ theme, ...props }) => css``}
`;

const LinkButton = styled.button`
  ${({ theme }) => css`
    border: none;
    background: none;
    display: inline;
    padding: 0;
    text-decoration: underline;
    color: ${theme.dark};
  `}
`;
