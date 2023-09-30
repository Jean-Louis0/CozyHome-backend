import express from "express"
import indexRouter from './Routes/index.mjs'
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3200


app.use(express.json())
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))

//frontend URL
const corsOptions = {
  origin: "*",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  Credentials: true,
}
app.use(cors(corsOptions))

app.use("/", indexRouter)




app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  }
)
