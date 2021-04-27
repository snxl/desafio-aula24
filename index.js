import express from "express"
import atendimentos from "./routes/atendimentos.js"

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/atendimentos", atendimentos )

export default app
