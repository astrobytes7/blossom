const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'tax',
    execute: async (message, args, client) => {
        // Check permissions: Admin or specific role
        const hasPerm = message.member.permissions.has(PermissionsBitField.Flags.Administrator) || 
                        message.member.roles.cache.has('1332954707676762203');
        
        if (!hasPerm) {
            return message.reply('<:click:1502158405870157945> You do not have **permission** to use this command.');
        }

        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Please provide a valid Robux amount.');
        }

        const receive = Math.floor(amount * 0.7);
        const charge = Math.ceil(amount / 0.7);

        await message.reply(`<:calculator:1502442136711200829> the taxed amount is **${charge}**`);
    }
};
