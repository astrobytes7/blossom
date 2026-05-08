const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'ping',
    execute: async (message, args, client) => {
        // Check permissions: Admin or specific role
        const hasPerm = message.member.permissions.has(PermissionsBitField.Flags.Administrator) || 
                        message.member.roles.cache.has('1320685222685310997');
        
        if (!hasPerm) {
            return message.reply('<:click:1502158405870157945> You do not have **permission** to use this command.');
        }

        const sent = await message.reply('Pinging...');
        const latency = sent.createdTimestamp - message.createdTimestamp;
        
        await sent.edit(`Pong! Latency is ${latency}ms. API Latency is ${Math.round(client.ws.ping)}ms.`);
    }
};
