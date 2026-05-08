const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'ping',
    execute: async (message, args, client) => {


        const sent = await message.reply('Pinging...');
        const latency = sent.createdTimestamp - message.createdTimestamp;
        
        await sent.edit(`Pong! Latency is ${latency}ms. API Latency is ${Math.round(client.ws.ping)}ms.`);
    }
};
