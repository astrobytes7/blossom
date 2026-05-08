const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tax')
        .setDescription('Calculate Roblox 30% tax')
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('The amount of Robux')
                .setRequired(true)
        ),
    execute: async (interaction, client) => {
        // Check permissions: Admin or specific role
        const hasPerm = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) || 
                        interaction.member.roles.cache.has('1332954707676762203');
        
        if (!hasPerm) {
            return interaction.reply({ 
                content: '<:click:1502158405870157945> You do not have **permission** to use this command.', 
                ephemeral: true 
            });
        }

        const amount = interaction.options.getInteger('amount');
        const receive = Math.floor(amount * 0.7);
        const charge = Math.ceil(amount / 0.7);

        await interaction.reply({
            content: `<:calculator:1502442136711200829> the taxed amount is **${charge}**`,
        });
    }
};
