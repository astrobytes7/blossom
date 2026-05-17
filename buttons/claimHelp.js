const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} = require('discord.js');
const DashboardHelpTicket = require('../models/dashboardHelpSchema');

module.exports = {
  customID: 'claimHelp',
  async execute(interaction) {
    try {
      const requiredRoleId = '1332954707676762203'; // Support role ID
      const isOwner = interaction.guild && interaction.guild.ownerId === interaction.user.id;
      const isAdmin = interaction.member && interaction.member.permissions && interaction.member.permissions.has && interaction.member.permissions.has('Administrator');
      if (!interaction.member || (!interaction.member.roles.cache.has(requiredRoleId) && !isOwner && !isAdmin)) {
        return interaction.reply({
          content: `You don't have permission to claim this ticket.`,
          ephemeral: true
        });
      }

      // Acknowledge the interaction to avoid "Unknown interaction" if DB work takes time
      await interaction.deferReply({ ephemeral: true });

      const user = interaction.user;
      const channel = interaction.channel;

      const ticket = await DashboardHelpTicket.findOne({ channelId: channel.id });
      if (!ticket) {
        return interaction.editReply({ content: 'No ticket data found for this channel.' });
      }

      if (ticket.claimedBy) {
        return interaction.editReply({ content: `This ticket is already claimed by <@${ticket.claimedBy}>.` });
      }

      ticket.claimedBy = user.id;
      await ticket.save();

      const embed = new EmbedBuilder()
        .setDescription(`Your ticket has been claimed by <@${user.id}>.`)
        .setImage('https://media.discordapp.net/attachments/1264584269758468249/1408682021802348634/Blossom_Customs_footer_better.png?ex=6a09f89e&is=6a08a71e&hm=fdb6170dec47f560b4f18bf44a4ab2401dd71dc2f96650d4413696c72ffcd848&=&format=webp&quality=lossless&width=2834&height=218')
        .setColor('#393939');

      const unclaimButton = new ButtonBuilder()
        .setCustomId('unclaimHelp')
        .setLabel('Unclaim')
        .setStyle(ButtonStyle.Secondary);

      const closeButton = new ButtonBuilder()
        .setCustomId('closeHelp')
        .setLabel('Close')
        .setStyle(ButtonStyle.Danger);

      const row = new ActionRowBuilder().addComponents(unclaimButton, closeButton);

      // Edit the original message's components directly (we already deferred)
      if (interaction.message && interaction.message.edit) {
        await interaction.message.edit({ components: [row] }).catch(() => { });
      }
      await channel.send({ embeds: [embed] });

      // Let the user know the claim succeeded (edit the deferred ephemeral reply)
      await interaction.editReply({ content: 'Ticket claimed successfully.' });

    } catch (error) {
      console.error('Error claiming ticket:', error);
      // If we've already acknowledged, follow up; otherwise reply
      try {
        if (interaction.deferred || interaction.replied) {
          await interaction.followUp({ content: 'An error occurred while claiming the ticket.', ephemeral: true });
        } else {
          await interaction.reply({ content: 'An error occurred while claiming the ticket.', ephemeral: true });
        }
      } catch (e) {
        // ignore follow-up errors
      }
    }
  }
};