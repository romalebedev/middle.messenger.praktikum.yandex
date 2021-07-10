const express = require("express")

const app = express()
const PORT = 3000;

app.use(express.static('./dist'))
// console.log('./dist')

app.listen(PORT, function () {
    console.log(`Expmple app listening on port ${PORT}`)
})