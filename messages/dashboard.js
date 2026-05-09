const {
  ButtonBuilder,
  ButtonStyle,
  TextDisplayBuilder,
  MessageFlags,
  SeparatorBuilder,
  ContainerBuilder,
  MediaGalleryBuilder,
  ActionRowBuilder,
  // New imports for the select menu
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder
} = require("discord.js");

module.exports = {
  name: "dash",
  cooldown: 5,
  async execute(message) {
    // Deletes the command message
    await message.delete()
    const requiredRoleId = "1502446440050589696";

    // Security Check
    if (!message.member.roles.cache.has(requiredRoleId)) {
      return;
    }

    // --- Component Definitions ---

    const Text = new TextDisplayBuilder().setContent('## Server Dashboard\nWelcome to <:blossom:1502473272501997678> **Blossom Customs**, where we create designs that bloom. We are dedicated to developing high-quality products tailored to your needs, while keeping our services affordable for everyone.')

    const media = new MediaGalleryBuilder()
      .addItems([
        { media: { url: 'https://media.discordapp.net/attachments/1264584269758468249/1408682025560309800/Blossom_Customs_Dashboard.png?ex=69ff6c9e&is=69fe1b1e&hm=a6df5b3db57ca52a8337f6f6a34c92311c4831fab4198dea39aab95a080b0bcb&=&format=webp&quality=lossless&width=2834&height=869' } }
      ])

    const media2 = new MediaGalleryBuilder()
      .addItems([
        { media: { url: 'https://media.discordapp.net/attachments/1264584269758468249/1408682021802348634/Blossom_Customs_footer_better.png?ex=69ff6c9e&is=69fe1b1e&hm=8b6c5258cd963692c66ac13e122f977080145eae0d16bc82becfcddae298a8a5&=&format=webp&quality=lossless&width=2834&height=218' } }
      ])

    const seperator = new SeparatorBuilder();

    // Button Definition
    const button = new ButtonBuilder()
      .setLabel('Support')
      .setEmoji('<:Support2:1482767691252240444>')
      .setStyle(ButtonStyle.Danger)
      .setCustomId('dashboardHelp')

    const apps = new ButtonBuilder()
      .setLabel('Designer Application')
      .setStyle(ButtonStyle.Secondary)
      .setEmoji('<:person:1502464553919975494>')
      .setCustomId('application')

    const regs = new ButtonBuilder()
      .setLabel('Regulations')
      .setEmoji('<:book:1502464181075574794>')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId('about-us')

    const group = new ButtonBuilder()
      .setLabel('Roblox Group')
      .setEmoji('<:roblox:1502464380594556948>')
      .setStyle(ButtonStyle.Link)
      .setURL('https://noteshan.xyz')
    // Button Action Row
    const buttonRow = new ActionRowBuilder().addComponents(button, apps, group);




    // Select Menu Definition
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("navigate_menu")
      .setDisabled(false)
      .setPlaceholder("Learn more...")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Server Guidelines")
          .setDescription("Check out the rules of our server!")
          .setValue("server_guidelines"),
        new StringSelectMenuOptionBuilder()
          .setLabel("About Us")
          .setDescription("Get to know more about Blossom Customs!")
          .setValue("about-us")
      );

    // Select Menu Action Row (Must be its own row)
    const selectMenuRow = new ActionRowBuilder().addComponents(selectMenu);


    // --- Container Building ---
    const container = new ContainerBuilder()
      .addMediaGalleryComponents(media)
      .addSeparatorComponents(seperator)
      .addTextDisplayComponents(Text)
      .addSeparatorComponents(seperator)

      // Add the Select Menu Row

      // Add the Button Row
      .addActionRowComponents(buttonRow)
      .addActionRowComponents(selectMenuRow)
      // Add the final separator and footer media
      .addSeparatorComponents(seperator)
      .addMediaGalleryComponents(media2);


    try {
      await message.channel.send({
        flags: MessageFlags.IsComponentsV2,
        components: [container]
      });
    } catch (error) {
      console.error("Error sending embed message", error);
    }
  },
};