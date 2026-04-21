const express = require('express');
const axios = require('axios');
const app = express();

// APNA HUGGING FACE SPACE LINK YAHAN DALO
const HF_BASE_URL = 'https://jpingovernmen-anifinixai.hf.space'; 

app.get('*', async (req, res) => {
    try {
        const url = `${HF_BASE_URL}${req.url}`;
        
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream',
            // Hugging Face ko batana ki ye normal browser hai
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                'Referer': HF_BASE_URL
            }
        });

        // Data ko viewer tak "Pass" (Pipe) karna
        res.setHeader('Access-Control-Allow-Origin', '*');
        response.data.pipe(res);
        
    } catch (error) {
        console.error("Error fetching from HF:", error.message);
        res.status(500).send('Relay Error');
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Relay Running on Port ${PORT}`));
