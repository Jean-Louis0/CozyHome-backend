import express from "express"
import indexRouter from './Routes/index.mjs'
import dotenv from "dotenv"
import bodyParser from "body-parser"


const app = express()
dotenv.config()

const PORT = process.env.PORT || 3200


app.use(express.json())

app.use("/", indexRouter)
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))




app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  }
)