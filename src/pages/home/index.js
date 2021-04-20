import React from "react";
import HelmetDefault from "../../seo/Helmet";

//styles
import { StyledHomeBody } from "./styles";

const Home = () => {
  return (
    <>
      <HelmetDefault
        {...{
          title: "titulo de pagina home",
          fullTitle: `titulo de pagina home`,
          description: `descripcion pagina home`,
          image: `imagen pagina hpme`,
          keywords: " keywords pagina home",
        }}
      />
      <StyledHomeBody>
        <h1>BIENVENIDO A REACT SSR</h1>
      </StyledHomeBody>
    </>
  );
};

export default Home;
