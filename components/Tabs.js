import styled, { css } from "styled-components";

const Tabs = ({ items, active, setActive }) => {
  return (
    <StyledTabs>
      {items.map((item, i) => (
        <Tab
          key={i}
          typeColor={item.color}
          active={active === i}
          onClick={() => setActive(i)}
        >
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
  border: solid #c0d3c8 1px;
  border-width: 1px 0 0 0;
  margin-bottom: 1.6em;
  margin-left: -20px;
  margin-right: -20px;
`;

const Tab = styled.button`
  ${({ theme, active }) => css`
    border: none;
    flex: 1;
    font-size: 2em;
    font-family: ${theme.fontFancy};
    text-transform: uppercase;
    font-weight: normal;
    display: flex;
    align-items: center;
    padding: 0.6em 1.1em;
    
    color: ${theme.navy};
    
    background-color: ${active ? "transparent" : "#dee8e2"};
    border-bottom: solid ${active ? "transparent" : "#c0d3c8"} 1px;
    border-top: solid ${active ? theme.green : "transparent"} .2em;

    /* transition:  0.3s ease; */
    /* :hover {
      background-color: ${theme.light};
    } */

    /* border-top: solid ${active ? theme.green : "transparent"} .2em;
    border-bottom: 0; */


    /* ${
      active &&
      `
    border-top: solid ${theme.green} .2em;
    border-bottom: 0;
    `
    } */
    + button {
      border-left: solid #c0d3c8 1px;
    }
    img {
      height: 1.8em;
      margin-right: 0.5em;
    }
    :first-child {
      img {
        height: 2em;
      }
    }
  `}
`;
