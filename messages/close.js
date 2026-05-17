const { AttachmentBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const DiscordTranscripts = require('discord-html-transcripts');
const DashboardHelpTicket = require('../models/dashboardHelpSchema');
const { createTranscript } = require('../utils/cookieApi');

const LOG_CHANNEL_ID = '1364510674847273032'; // Replace with transcript channel id

module.exports = {
  name: 'close',
  execute: async (message, args, client) => {
    try {
      const requiredRoleId = '1332954707676762203'; // Support role ID
      const isOwner = message.guild && message.guild.ownerId === message.author.id;
      const isAdmin = message.member && message.member.permissions && message.member.permissions.has && message.member.permissions.has('Administrator');
      if (!message.member || (!message.member.roles.cache.has(requiredRoleId) && !isOwner && !isAdmin)) {
        return message.reply("You don't have permission to close this ticket.");
      }

      const channel = message.channel;
      const closer = message.author;
      const reason = args.join(' ') || 'No reason provided.';

      const ticket = await DashboardHelpTicket.findOne({ channelId: channel.id });
      if (!ticket) {
        return message.reply('No ticket data found for this channel.');
      }

      await message.reply('This ticket is being closed...');

      await DashboardHelpTicket.findOneAndUpdate(
        { channelId: channel.id },
        {
          status: 'closed',
          closedBy: closer.id,
          closeReason: reason,
        }
      );

      // Generate Web Transcript (Cookie API)
      const webTranscriptUrl = await createTranscript(channel.id, client).catch(() => null);

      // Generate Local Transcript (Fallback/Attachment)
      const transcript = await DiscordTranscripts.createTranscript(channel, {
        limit: -1,
        returnType: 'buffer',
        filename: `${ticket.username}-${ticket.ticketId}.html`,
        saveImages: true
      });

      const transcriptFile = new AttachmentBuilder(transcript, {
        name: `${ticket.username}-${ticket.ticketId}.html`,
      });

      const dmEmbed = new EmbedBuilder()
        .setTitle('<:BlossomLogo:1326224460839391338> Ticket Closed')
        .setColor('#393939')
        .setDescription(`- Your ticket in **Blossom Customs** has been closed. We **appreciate** you taking the time to reach out to our team regarding your concern. Your communication helps us** better support our community and address issues effectively.** If you need any further assistance, please feel free to open a new ticket at any time.`)
        .addFields(
          { name: 'Closure Reason', value: reason, inline: true },
          { name: 'Closed By', value: `<@${closer.id}>`, inline: true }
        )
        .setFooter({ text: `Ticket ID: ${ticket.ticketId}` })
        .setImage("https://media.discordapp.net/attachments/1264584269758468249/1408682021802348634/Blossom_Customs_footer_better.png?ex=6a09f89e&is=6a08a71e&hm=fdb6170dec47f560b4f18bf44a4ab2401dd71dc2f96650d4413696c72ffcd848&=&format=webp&quality=lossless&width=2834&height=218");

      if (webTranscriptUrl) {
        dmEmbed.addFields({ name: 'Web Transcript', value: `[View Online](${webTranscriptUrl})`, inline: true });
      }

      const logEmbed = new EmbedBuilder()
        .setTitle('Support Ticket Closed')
        .setColor('#393939')
        .setImage("https://media.discordapp.net/attachments/1264584269758468249/1408682021802348634/Blossom_Customs_footer_better.png?ex=6a09f89e&is=6a08a71e&hm=fdb6170dec47f560b4f18bf44a4ab2401dd71dc2f96650d4413696c72ffcd848&=&format=webp&quality=lossless&width=2834&height=218")
        .addFields(
          { name: 'Closure Reason', value: reason, inline: true },
          { name: 'Closed By', value: `<@${closer.id}>`, inline: true },
        )
        .setFooter({ text: `User ID: ${ticket.userId} | Ticket ID: ${ticket.ticketId}` });

      if (webTranscriptUrl) {
        logEmbed.addFields({ name: 'Web Transcript', value: `[View Online](${webTranscriptUrl})`, inline: true });
      }

      const logChannel = client.channels.cache.get(LOG_CHANNEL_ID);

      const components = [];
      if (webTranscriptUrl) {
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel('View Transcript')
            .setStyle(ButtonStyle.Link)
            .setURL(webTranscriptUrl)
        );
        components.push(row);
      }

      if (logChannel?.isTextBased()) {
        await logChannel.send({
          embeds: [logEmbed],
          components: components
        }).catch(() => null);
      }

      const user = client.users.cache.get(ticket.userId);
      if (user) {
        await user.send({
          embeds: [dmEmbed],
          components: components
        }).catch(() => null);
      }

      await channel.delete().catch(() => { });

    } catch (error) {
      console.error('Error in close command:', error);
      await message.reply('An error occurred while closing the ticket.').catch(() => {});
    }
  }
};
