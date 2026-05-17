const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} = require('discord.js');
const DashboardHelpTicket = require('../models/dashboardHelpSchema');

module.exports = {
  name: 'unclaim',
  execute: async (message, args, client) => {
    try {
      const requiredRoleId = '1332954707676762203'; // Support role ID
      const isOwner = message.guild && message.guild.ownerId === message.author.id;
      const isAdmin = message.member && message.member.permissions && message.member.permissions.has && message.member.permissions.has('Administrator');
      if (!message.member || (!message.member.roles.cache.has(requiredRoleId) && !isOwner && !isAdmin)) {
        return message.reply("You don't have permission to unclaim this ticket.");
      }

      const channel = message.channel;
      const user = message.author;

      const ticket = await DashboardHelpTicket.findOne({ channelId: channel.id });
      if (!ticket) {
        return message.reply('No ticket data found for this channel.');
      }

      if (!ticket.claimedBy) {
        return message.reply('This ticket is not currently claimed.');
      }

      ticket.claimedBy = null;
      await ticket.save();

      const embed = new EmbedBuilder()
        .setDescription(`This ticket has been unclaimed by <@${user.id}>.`)
        .setImage('https://media.discordapp.net/attachments/1264584269758468249/1408682021802348634/Blossom_Customs_footer_better.png?ex=6a09f89e&is=6a08a71e&hm=fdb6170dec47f560b4f18bf44a4ab2401dd71dc2f96650d4413696c72ffcd848&=&format=webp&quality=lossless&width=2834&height=218')
        .setColor('#393939');

      const claimButton = new ButtonBuilder()
        .setCustomId('claimHelp')
        .setLabel('Claim')
        .setStyle(ButtonStyle.Secondary);

      const closeButton = new ButtonBuilder()
        .setCustomId('closeHelp')
        .setLabel('Close')
        .setStyle(ButtonStyle.Danger);

      const row = new ActionRowBuilder().addComponents(claimButton, closeButton);

      // Find original message with components and edit it
      const messages = await channel.messages.fetch({ limit: 50 });
      const botMessage = messages.find(m => m.author.id === client.user.id && m.components.length > 0);
      if (botMessage) {
        await botMessage.edit({ components: [row] }).catch(() => { });
      }

      await channel.send({ embeds: [embed] });

      // Clean up the command and send a temporary success message
      await message.delete().catch(() => { });

    } catch (error) {
      console.error('Error in unclaim command:', error);
      await message.reply('An error occurred while unclaiming the ticket.');
    }
  }
};
