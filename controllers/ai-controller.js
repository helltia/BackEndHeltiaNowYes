const axios = require("axios");
const userController = require('./user-controller');
const api_key = "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";

async function image(base64Image){

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
                            "text": "Considerando la imagen,¿Que tipo de lesión parece ser?, ¿cuáles podrían ser las medidas de primeros auxilios que se deben tener en cuenta? Además, ¿qué acciones inmediatas o precauciones deberían tomarse en esta situación?What’s in this image?"
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": `data:image/jpeg;base64,${base64Image}`
                            }
                        }
                    ]
                }
            ],
            "max_tokens": 300
        };

        const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, { headers });

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
            "messages": messages.messages
        };
        console.log(messages.messages);
        const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, { headers });
        console.log(response);
        return response.data.choices[0]?.message?.content;
        
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = {
    image,
    chat
}
