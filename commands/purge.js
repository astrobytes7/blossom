const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge a specific amount of messages.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The number of messages to delete (1-100)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)),

    execute: async (interaction) => {
        // Check permissions: Admin or specific role
        const hasPerm = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) ||
            interaction.member.roles.cache.has('1320685222685310997');

        if (!hasPerm) {
            return interaction.reply({
                content: '<:click:1502158405870157945> You do not have **permission** to use this command.',
                ephemeral: true
            });
        }

        const amount = interaction.options.getInteger('amount');

        try {
            // Bulk delete messages
            const deleted = await interaction.channel.bulkDelete(amount, true);

            // Send confirmation
            await interaction.reply({
                content: `<:broom:1502452724296323082> I have purged ${deleted.size} messages.`
            });

            // Delete the reply after 5 seconds
            setTimeout(() => {
                interaction.deleteReply().catch(err => console.error("Error deleting purge reply:", err));
            }, 5000);

        } catch (error) {
            console.error("Failed to purge messages:", error);
            return interaction.reply({
                content: 'I encountered an error. (Note: Discord cannot bulk delete messages older than 14 days).',
                ephemeral: true
            });
        }
    }
};