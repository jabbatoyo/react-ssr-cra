import Loadable from "react-loadable";

import app from "./app";

console.log("datos puerto", process.env.SERVER_PORT);
const PORT = process.env.SERVER_PORT || 3456;

try {
  Loadable.preloadAll().then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
      // process.send('ready');
    });
  });
} catch (error) {
  console.log(error);
}

export default app;
