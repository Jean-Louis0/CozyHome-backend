import express from "express"
import indexRouter from './Routes/index.mjs'
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3200


app.use(express.json())

app.use("/", indexRouter)
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))

//frontend URL
app.use(cors({
  origin: "https://cozyhome.onrender.com",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true // for Cookies and authentication headers
}));



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  }
)