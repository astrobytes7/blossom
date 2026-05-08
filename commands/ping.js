const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    execute: async (interaction, client) => {
        // Check permissions: Admin or specific role
        const hasPerm = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) || 
                        interaction.member.roles.cache.has('1320685222685310997');
        
        if (!hasPerm) {
            return interaction.reply({ 
                content: '<:click:1502158405870157945> You do not have **permission** to use this command.', 
                ephemeral: true 
            });
        }

        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        
        await interaction.editReply(`Pong! Latency is ${latency}ms. API Latency is ${Math.round(client.ws.ping)}ms.`);
    }
};
