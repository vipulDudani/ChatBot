const {Configuration, OpenAIApi} = require('openai');
const express = require('express');

const path=require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// const key="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";
const OPENAI_API_KEY="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"
// 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

const config = new Configuration({
    apiKey: OPENAI_API_KEY
});


const openai = new OpenAIApi(config);


app.post('/message', (req, res) => {
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: req.body.message,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 256
    });

    response.then((data) => {
        const message = {message: data.data.choices[0].text};
        res.send(message);
    }).catch((err) => {
        res.send(err);
    });
});



app.listen(3000, () => console.log('Listening on port 3000'));

