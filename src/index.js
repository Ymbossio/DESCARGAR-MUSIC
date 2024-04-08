const express = require('express');
const app = express();

PORT = process.env.PORT || 5665;

app.use(express.urlencoded({extended: true}));

//set templace
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get('/', (req, resp) =>{
    resp.render("App");
})


app.listen(PORT, ()=>{
    console.log(`run port on ${PORT}`);
})