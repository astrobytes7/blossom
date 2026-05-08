const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make the bot say a message')
        .addStringOption(option => 
            option.setName('message')
                .setDescription('The message to send')
                .setRequired(true)
        ),
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

        const content = interaction.options.getString('message');

        try {
            await interaction.channel.send(content);
            await interaction.reply({ 
                content: 'Message successfully sent.', 
                ephemeral: true 
            });
        } catch (error) {
            console.error("Failed to send message:", error);
            await interaction.reply({ 
                content: 'Failed to send the message.', 
                ephemeral: true 
            });
        }
    }
};
