const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");
const AssistanceModel = require('../models/AssistanceModel');

module.exports = {
	customID: 'order:menu',
	execute: async function (interaction, client, args) {
		const type = interaction.values[0];

		await interaction.deferReply({ ephemeral: true });

		let categoryId, designerRole;
		switch (type) {
			case 'clothing':
				categoryId = '1407530678962360362'; // replace with your category id
				designerRole = '1371967361464401920'; // replace with your designer role
				break;
		
			case 'livery':
				categoryId = '1407530678962360362'; // replace with your category id
				designerRole = '1371967361464401920'; // replace with your designer role
				break;

			case 'graphics':
				categoryId = '1407530678962360362'; // replace with your category id
				designerRole = '1371967361464401920'; // replace with your designer role
				break;

			case 'discord':
				categoryId = '1407530678962360362'; // replace with your category id
				designerRole = '1371967361464401920'; // replace with your designer role
				break;

			case 'photography':
				categoryId = '1407530678962360362'; // replace with your category id
				designerRole = '1371967361464401920'; // replace with your designer role
				break;
		}

		const channel = await interaction.guild.channels.create({
			name: `🔴・unclaimed`,
			parent: categoryId,
			type: 0, // text channel
			permissionOverwrites: [
				{
					id: interaction.guild.id,
					deny: [PermissionFlagsBits.ViewChannel]
				},
				{
					id: interaction.user.id,
					allow: [
						PermissionFlagsBits.ViewChannel,
						PermissionFlagsBits.SendMessages,
						PermissionFlagsBits.AttachFiles
					]
				},
				{
					id: designerRole,
					allow: [
						PermissionFlagsBits.ViewChannel,
						PermissionFlagsBits.SendMessages,
						PermissionFlagsBits.AttachFiles
					]
				}
			]
		});

		await AssistanceModel.create({
			userId: interaction.user.id,
			channelId: channel.id,
			type
		});

		const hrRoles = ['1371967392585875546', '1371967379160174592']; // replace with all of your hr roles
		await Promise.all(
			hrRoles.map(roleId =>
				channel.permissionOverwrites.create(roleId, {
					ViewChannel: true,
					SendMessages: true,
					AttachFiles: true
				})
			)
		);

		const name = type.charAt(0).toUpperCase() + type.slice(1);

		await channel.send({
			content: `<@&${designerRole}> | ${interaction.user}`,
			embeds: [
				new EmbedBuilder()
					.setColor('#2b2d31')
					.setImage('https://cdn.discordapp.com/attachments/1400322766489518141/1408214450208768182/Strive_Packs_DASHBOARD.png?ex=68ac3928&is=68aae7a8&hm=2741c62de1a065c41c6bc6809a16c610ef8d974c78f88ab2b7ee62cd559eac33&'),
				new EmbedBuilder()
					.setTitle(`${name} - ${interaction.user.username}`)
					.setDescription(`Please provide a detailed description of your ${type} request. Include any references, preferences, or requirements to help our designers fulfill your order.`)
					.setColor('#2b2d31')
					.setImage('https://cdn.discordapp.com/attachments/1400322766489518141/1408217948832927856/Strive_Packs_Footer_Banner.png?ex=68ac3c6a&is=68aaeaea&hm=66a0339c0c35c5346f8f573d03b39b7fa6f00b410ed08822c3fa876d107436f2&')
			],
			components: [
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId('claim:button')
						.setLabel('Claim')
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId('close:button')
						.setLabel('Close')
						.setStyle(ButtonStyle.Danger)
				)
			]
		});

		await interaction.editReply(`Your order has been created; ${channel}`);
	}
}