import express from "express"
import indexRouter from './Routes/index.mjs'


const app = express()

const port = process.env.PORT || 3000


app.use(express.json())

app.use("/", indexRouter)


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  }
)