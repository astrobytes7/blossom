const {
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} = require('discord.js');
const Ticket = require('../models/dashboardHelpSchema');
const { getRobloxAccount } = require('../utils/BloxlinkApi');

module.exports = {
  customID: 'dashboardHelpModal',

  async execute(interaction) {
    try {
      const reason = interaction.fields.getTextInputValue('dashboardInquiryReason');

      // 1. Acknowledge the interaction immediately to prevent timeouts
      // Using flags: 64 (MessageFlags.Ephemeral) instead of the deprecated ephemeral: true
      await interaction.deferReply({ flags: 64 });

      const roblox = await getRobloxAccount(interaction.guild.id, interaction.user.id) || 'No Linked Account';

      const guild = interaction.guild;
      const opener = interaction.user;
      const supportRoleId = '1502446440050589696'; // Support role ID
      const ticketCategoryId = '1502474946780074044'; // Ticket category ID
      const channelName = `support-${opener.username}`;

      const ticketChannel = await guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        parent: ticketCategoryId,
        permissionOverwrites: [
          {
            id: guild.roles.everyone,
            deny: [PermissionFlagsBits.ViewChannel]
          },
          {
            id: opener.id,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
          },
          {
            id: supportRoleId,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
          }
        ]
      });

      const ticketId = ticketChannel.id;

      // Large banner embed
      const imageEmbed = new EmbedBuilder()
        .setImage('https://media.discordapp.net/attachments/1264584269758468249/1408682025560309800/Blossom_Customs_Dashboard.png?ex=69ff6c9e&is=69fe1b1e&hm=a6df5b3db57ca52a8337f6f6a34c92311c4831fab4198dea39aab95a080b0bcb&=&format=webp&quality=lossless&width=2834&height=869')
        .setColor('#393939');

      // Help embed with small banner
      const helpEmbed = new EmbedBuilder()
        .setDescription(`Thank you for contacting **<:blossom:1502473272501997678> Blossom Customs** support. A staff member has been notified and will assist you shortly.`)
        .addFields(
          { name: 'Inquiry', value: reason, inline: true },
          { name: 'Roblox Information', value: typeof roblox === 'string' ? roblox : roblox.format, inline: true }
        )
        .setColor('#393939')
        .setImage('https://media.discordapp.net/attachments/1264584269758468249/1408682021802348634/Blossom_Customs_footer_better.png?ex=69ff6c9e&is=69fe1b1e&hm=8b6c5258cd963692c66ac13e122f977080145eae0d16bc82becfcddae298a8a5&=&format=webp&quality=lossless&width=2834&height=218');

      const claimButton = new ButtonBuilder()
        .setLabel('Claim')
        .setCustomId('claimHelp')
        .setStyle(ButtonStyle.Secondary);

      const closeButton = new ButtonBuilder()
        .setLabel('Close')
        .setCustomId('closeHelp')
        .setStyle(ButtonStyle.Danger);

      const row = new ActionRowBuilder().addComponents(claimButton, closeButton);

      await ticketChannel.send({
        content: `<@${opener.id}> | <@here>`,
        embeds: [imageEmbed, helpEmbed],
        components: [row]
      });

      await Ticket.create({
        userId: opener.id,
        username: opener.username,
        channelId: ticketChannel.id,
        reason,
        status: 'open',
        createdAt: new Date(),
        claimedBy: null,
        closedBy: null,
        ticketId
      });

      // Use editReply since we deferred
      await interaction.editReply({ content: `<:CoastalCoreGraident:1465072459752673402> Your ticket has been successfully created - <#${ticketChannel.id}>` });

    } catch (error) {
      console.error('Error creating ticket from modal:', error);
      // Ensure we only try to reply if the interaction is still valid and not already replied to
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply({ content: 'An error occurred while creating the ticket.' }).catch(() => { });
      } else {
        await interaction.reply({ content: 'An error occurred while creating the ticket.', flags: 64 }).catch(() => { });
      }
    }
  }
};
