const {
	ContainerBuilder,
	MediaGalleryBuilder,
	TextDisplayBuilder,
	SeparatorBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	MessageFlags
} = require("discord.js");

const requiredRoles = ['1320721907946881115']; // the roles required to use this command
const channelId = '1320626928809410632'; // the channel to send the message to

module.exports = {
	name: 'order',
	description: 'Sends the order panel embed.',
	execute: async function (message, args, client) {
		if (!message.member.roles.cache.some(role => requiredRoles.includes(role.id)))
			return;

		const channel = await client.channels.fetch(channelId).catch(() => null) || client.channels.cache.get(channelId);
		if (!channel || !channel.isSendable())
			return await message.reply('Channel not found or invalid');

		// --- Component Definitions ---

		const headerBanner = new MediaGalleryBuilder()
			.addItems([
				{ media: { url: 'https://media.discordapp.net/attachments/1384900028757442693/1411264051954061322/Blossom_Customs_Order.png?ex=6a0acb92&is=6a097a12&hm=41975095ef9e7ccff39ec5b0a4dc6e91073cacc11bf40c7f0e8cfa63ba834f95&=&format=webp&quality=lossless&width=2834&height=869' } }
			]);

		const footerBanner = new MediaGalleryBuilder()
			.addItems([
				{ media: { url: 'https://media.discordapp.net/attachments/1264584269758468249/1408682021802348634/Blossom_Customs_footer_better.png?ex=6a0b4a1e&is=6a09f89e&hm=0b93911f6af138cdb3497ea6a06982edede6609c752145fc1f7d739f2cb7c836&=&format=webp&quality=lossless&width=2834&height=218' } }
			]);

		const description = new TextDisplayBuilder()
			.setContent('Welcome to **<:BlossomLogo:1326224460839391338>Blossom Customs Order Center**. Before ordering, ensure that you have read our pricing guide and our Terms of Service. Our team makes high quality products with an affordable price so that everyone may get their products to start a new server. Designers are able to make their own prices depending on the complexity of your order. By creating an order, you automatically agree to our Terms of Service.');

		const separator = new SeparatorBuilder();

		const menu = new ActionRowBuilder().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId('order:menu')
				.setPlaceholder('Place an order!')
				.addOptions(
					new StringSelectMenuOptionBuilder()
						.setValue('clothing')
						.setLabel('Clothing'),
					new StringSelectMenuOptionBuilder()
						.setValue('livery')
						.setLabel('Livery'),
					new StringSelectMenuOptionBuilder()
						.setValue('graphics')
						.setLabel('Graphics'),
					new StringSelectMenuOptionBuilder()
						.setValue('discord')
						.setLabel('Discord Services'),
					new StringSelectMenuOptionBuilder()
						.setValue('photography')
						.setLabel('Photography'),
					new StringSelectMenuOptionBuilder()
						.setValue('els')
						.setLabel('ELS'),
					new StringSelectMenuOptionBuilder()
						.setValue('bots')
						.setLabel('Discord Bots'),
				)
		);

		const buttons = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setLabel('Terms of Service')
				.setEmoji('<:BlossomLink:1394566433601753158>')
				.setStyle(ButtonStyle.Link)
				.setURL('https://docs.google.com/document/d/1iMs6Z_SM6OFmL941vEzM7I_TjsXkUaBO-Hx-iXjMHMg/edit?usp=sharing'),
			new ButtonBuilder()
				.setCustomId('prices:disabled')
				.setLabel('Prices')
				.setEmoji('<:BlossomRobux:1394566473069887498>')
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(true)
		);

		// --- Container Assembly ---
		const container = new ContainerBuilder()
			.addMediaGalleryComponents(headerBanner)
			.addSeparatorComponents(separator)
			.addTextDisplayComponents(description)
			.addSeparatorComponents(separator)
			.addActionRowComponents(menu)
			.addActionRowComponents(buttons)
			.addSeparatorComponents(separator)
			.addMediaGalleryComponents(footerBanner);

		await channel.send({
			flags: MessageFlags.IsComponentsV2,
			components: [container]
		});
		await message.delete();
	}
};
