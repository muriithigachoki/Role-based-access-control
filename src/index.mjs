import express from "express";
import router from "./router/index.mjs";

const app = express();
app.use(express.json());

app.use("/api/v1", router);

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
