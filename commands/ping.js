const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    ContainerBuilder,
    TextDisplayBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    MessageFlags
} = require('discord.js');
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

        const container = new ContainerBuilder()
            .setAccentColor(0xff66c4)
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent('### <:ping:1502443236894048356> **Pong!**')
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**Roundtrip Latency:** ${latency}ms\n**Websocket Ping:** ${Math.round(client.ws.ping)}ms\n**Database Status:** ${dbStatus}\n**Database Ping:** ${dbPing}`
                )
            );

        await interaction.editReply({ content: null, components: [container], flags: [MessageFlags.IsComponentsV2] });
    }
};
