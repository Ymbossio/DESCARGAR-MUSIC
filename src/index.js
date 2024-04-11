const express = require('express');
const app = express();

PORT = process.env.PORT || 5665;

app.use(express.urlencoded({extended: true}));

//set templace
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get('/', (req, resp) =>{
    resp.render("index");
})

app.post('/convert-mp3', async (req, resp) =>{
   const VideoId = req.body.VideoID;
   if(VideoId === undefined || VideoId === "" || VideoId === null){
        return resp.render("index", {success: false, message: 'Por favor ingrese el Id del Video'});  
   }else{

        const url = `https://youtube-mp3-downloader2.p.rapidapi.com/?id=${VideoId}`
        const option = {
            "method": "GET",
            "headers": { 
                "x-rapidapi-key": process.env.API_KEY,
                "x-rapidapi-host": process.env.API_HOST
            }
    };

    try {
        const FetchAPi = await fetch(url, option);
        const ResponseFetch = await FetchAPi.json();

        if(ResponseFetch.status === "ok"){
            return resp.render("index", {success: true, song_title: ResponseFetch.title, song_link: ResponseFetch.link})
        }

    } catch (error) {
        console.log("error", error);
        return resp.render("index", { success: false, message: 'Error en la solicitud' });
        
    }
    

    

}
})

app.listen(PORT, ()=>{
    console.log(`run port on ${PORT}`);
})