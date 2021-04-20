import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: relative;
  background: #fff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .modal-background {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 40;
    background: rgba(255, 255, 255, 0.7);
  }
  .main {
    position: relative;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <StyledContainer>
        <div className="main">{children}</div>
      </StyledContainer>
    </>
  );
};

export default Layout;
