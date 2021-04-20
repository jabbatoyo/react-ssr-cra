import React from "react";
import styled from "styled-components";

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .loading-img {
    width: 60px !important;
    height: auto;
  }
`;

export default function Loading() {
  return (
    <StyledLoading>
      <img className="loading-img" src="/img/loading.gif" alt="loading" />
    </StyledLoading>
  );
}
