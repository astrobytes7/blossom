const { EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    name: 'ping',
    execute: async (message, args, client) => {
        const sent = await message.reply('Pinging...');
        const latency = sent.createdTimestamp - message.createdTimestamp;

        let dbStatus = 'Not Connected';
        let dbPing = 'N/A';

        if (mongoose.connection.readyState === 1) {
            dbStatus = 'Connected';
            const start = Date.now();
            try {
                await mongoose.connection.db.admin().ping();
                dbPing = `${Date.now() - start}ms`;
            } catch (err) {
                dbPing = 'Error';
            }
        }

        const embed = new EmbedBuilder()
            .setTitle('<:ping:1502443236894048356> Pong!')
            .setDescription(`Roundtrip Latency: \`${latency}ms\`\nWebsocket Ping: \`${Math.round(client.ws.ping)}ms\`\nDatabase Status: \`${dbStatus}\`\nDatabase Ping: \`${dbPing}\``)
            .setColor('#ff66c4');

        await sent.edit({ content: null, embeds: [embed] });
    }
};
