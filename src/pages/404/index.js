import React, { useEffect } from "react";

const NotFound = () => {
  const { setShowSticker } = useModal();
  useEffect(() => {
    setShowSticker(false);
  }, []);
  return (
    <>
        <div className="not-found-container">
          <div className="not-found-content">
            <h1>¡Ups! No hemos encontrado la página que estabas buscando.</h1>
          </div>
        </div>
    </>
  );
};

export default NotFound;
