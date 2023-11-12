const axios = require("axios");
const userController = require('./user-controller');
const api_key = process.env.API_KEY;

async function image(base64Image){
    console.log('aqui img64');
    try {

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api_key}`
        };

        const payload = {
            "model": "gpt-4-vision-preview",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Considerando la imagen,¿Que tipo de lesión parece ser?, ¿cuáles podrían ser las medidas de primeros auxilios que se deben tener en cuenta? Además, ¿qué acciones inmediatas o precauciones deberían tomarse en esta situación? (ojo, si consideras que la lesión es muy grave, no le des tips, mandaló a urgencias de inmediato)"
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": `${base64Image}`
                            }
                        }
                    ]
                }
            ],
            "max_tokens": 200
        };
        console.log('aqui img64 2');
        //console.log('aqui img64 p', base64Image);
        const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, { headers });
        console.log(response);
        return response.data.choices[0]?.message?.content;

    } catch (e) {
        console.log(e.message);
    }
}


async function chat(messages){

    try {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api_key}`
        };
        console.log('2');
        const payload = {
            "model": "gpt-4-1106-preview",
            "messages": messages.messages,
            "max_tokens": 200
        };
        const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, { headers });
        return response.data.choices[0]?.message?.content;

    } catch (e) {
        console.log(e.message);
    }
}

module.exports = {
    image,
    chat
}
