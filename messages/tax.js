const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'tax',
    execute: async (message, args, client) => {


        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Please provide a valid Robux amount.');
        }

        const receive = Math.floor(amount * 0.7);
        const charge = Math.ceil(amount / 0.7);

        await message.reply(`<:calculator:1502442136711200829> The taxed amount is **${charge}**. `);
    }
};
