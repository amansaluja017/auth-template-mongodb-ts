import "dotenv/config";
import {createServer} from "node:http";
import createApp from "./app.ts";

import ApiError from "./common/utils/api-error.ts";
import connectToDb from "./common/config/db.ts";

(function main() {
  try {
    const port = process.env.PORT || 8080;

    const server = createServer(createApp());
        console.log("Starting the server...");


    connectToDb()
      .catch((err: any) => console.log(err.message));

    server.listen(port, () => {
      console.log(`server is listen on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    throw ApiError.registrationFailed("Failed to start the server");
  }
})();
