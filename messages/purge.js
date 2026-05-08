const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'purge',
    execute: async (message, args, client) => {
        // Check permissions: Admin or specific role
        const hasPerm = message.member.permissions.has(PermissionsBitField.Flags.Administrator) ||
            message.member.roles.cache.has('1320685222685310997');

        if (!hasPerm) {
            return message.reply('<:click:1502158405870157945> You do not have **permission** to use this command.');
        }

        // Get the amount of messages to delete
        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            return message.reply('Please provide a valid number of messages to purge.');
        }

        if (amount <= 0 || amount > 100) {
            return message.reply('Please provide a number between 1 and 100.');
        }

        try {
            // Delete the command message itself first
            await message.delete();

            // Bulk delete the messages
            const deleted = await message.channel.bulkDelete(amount, true);

            // Send success message
            const successMsg = await message.channel.send(`<:broom:1502452724296323082> I have purged ${deleted.size} messages.`);

            // Delete the success message after 5 seconds
            setTimeout(() => {
                successMsg.delete().catch(err => console.error("Error deleting success message:", err));
            }, 5000);

        } catch (error) {
            console.error("Failed to purge messages:", error);
            await message.channel.send('I encountered an error trying to purge messages in this channel. (Messages older than 14 days cannot be bulk deleted).');
        }
    }
};