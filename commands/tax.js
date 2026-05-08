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


        const amount = interaction.options.getInteger('amount');
        const receive = Math.floor(amount * 0.7);
        const charge = Math.ceil(amount / 0.7);

        await interaction.reply({
            content: `<:calculator:1502442136711200829> The taxed amount is **${charge}**.`,
        });
    }
};
