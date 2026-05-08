const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'say',
    execute: async (message, args, client) => {
        // Check permissions: Admin or specific role
        const hasPerm = message.member.permissions.has(PermissionsBitField.Flags.Administrator) || 
                        message.member.roles.cache.has('1320685222685310997');
        
        if (!hasPerm) {
            return message.reply('<:click:1502158405870157945> You do not have **permission** to use this command.');
        }

        const content = args.join(' ');
        if (!content) {
            return message.reply('Please provide a message to send.');
        }

        try {
            await message.channel.send(content);
            await message.reply('Message successfully sent.');
        } catch (error) {
            console.error("Failed to send message:", error);
            await message.reply('Failed to send the message.');
        }
    }
};
