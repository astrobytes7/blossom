const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'rr',
    description: 'Removes a role from a user.',
    execute: async (message, args, client) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('<:click:1502158405870157945> You do not have **permission** to use this command.');
        }

        const targetUser = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
        const targetRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        if (!targetUser) {
            return message.reply('Please mention a user or provide a valid user ID.');
        }

        if (!targetRole) {
            return message.reply('Please mention a role or provide a valid role ID.');
        }

        try {
            await targetUser.roles.remove(targetRole);
            await message.reply(`Successfully removed the role **${targetRole.name}** from **${targetUser.user.tag}**.`);
        } catch (error) {
            console.error(error);
            await message.reply('Failed to remove the role. Make sure I have enough permissions and my role is above the target role.');
        }
    }
};
