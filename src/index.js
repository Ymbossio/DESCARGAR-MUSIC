const express = require('express');
const axios = require('axios');
const app = express();

const PORT = 5665;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, resp) => {
    resp.render("index");
});

app.post('/convert-mp3', async (req, resp) => {
    const VideoId = req.body.VideoID;
    if (!VideoId) {
        return resp.render("index", { success: false, message: 'Por favor ingrese el Id del Video' });
    } else {

        const options = {
        method: 'GET',
        url: 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/',
        params: {
            url: `https://www.youtube.com/watch?v=hN5MBlGv2Ac=${VideoId}`
        },
        headers: {
            'X-RapidAPI-Key': '4025c81e2fmsh5f1db89d9893431p1ba301jsn00e17fdd250c',
            'X-RapidAPI-Host': 'youtube-mp3-downloader2.p.rapidapi.com'
        }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
});

app.listen(PORT, () => {
    console.log(`Run on Port ${PORT}`);
});
