const axios = require("axios");
const Configuration = require("openai").Configuration;
const OpenAIApi = requiere("openai").OpenAIApi;
const userController = require('./user-controller')
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
        res.status(500).json({
            message: "error",
            error: e.message
        });
    }
}


async function chat(username){
    
    try {
        messages = userController.getMessagesOpenAi(username);
        
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api_key}`
        };

        const payload = {
            "model": "gpt-4-1106-preview",
            "messages": messages
        };

        const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, { headers });

        return response.data.choices[0]?.message?.content;

    } catch (e) {
        res.status(500).json({
            message: "error",
            error: e.message
        });
    }
}

module.exports = {
    image
}
