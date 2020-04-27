import styled, { css } from "styled-components";

const Tabs = ({ items }) => {
  return (
    <StyledTabs>
      {items.map((item, i) => (
        <Tab key={i} typeColor={item.color}>
          <img src={require(`../public/${item.icon}`)} />
          <span>{item.title}</span>
        </Tab>
      ))}
    </StyledTabs>
  );
};

export default Tabs;

const StyledTabs = styled.div`
  display: flex;
`;

const Tab = styled.div`
  ${({ theme }) => css`
    flex: 1;
    font-size: 2em;
    font-family: ${theme.fontFancy};
    text-transform: uppercase;
    font-weight: normal;
  `}
`;
