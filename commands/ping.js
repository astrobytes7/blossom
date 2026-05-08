const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    execute: async (interaction, client) => {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        
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

        await interaction.editReply({ content: null, embeds: [embed] });
    }
};
