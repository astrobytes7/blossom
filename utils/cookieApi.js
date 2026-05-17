const axios = require('axios');

async function createTranscript(channelId, client) {
    try {
        if (!client.config.COOKIE_API) {
            console.error('COOKIE_API key is missing in config.js');
            return null;
        }

        const response = await axios.post(
            `https://api.cookie-api.com/api/transcript?channel_id=${channelId}`,
            {
                bot_token: client.token || client.config.TOKEN,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': client.config.COOKIE_API
                }
            }
        );

        if (response.data && response.data.success) {
            return response.data.url;
        } else {
            console.error('Cookie API Error:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Error creating transcript with Cookie API:', error.response?.data || error.message);
        return null;
    }
}

module.exports = { createTranscript };
