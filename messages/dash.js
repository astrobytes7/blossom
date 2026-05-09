const {
    ContainerBuilder,
    MediaGalleryBuilder,
    MediaGalleryItemBuilder,
    TextDisplayBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    SectionBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    PermissionFlagsBits,
    MessageFlags
} = require("discord.js");

module.exports = {
    name: "info",
    async execute(message, args, client) {
        // Admin Perm Check
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply("❌ You do not have permission to use this command.");
        }

        const components = [
            new ContainerBuilder()
                // Top Media Gallery (Blossom Customs Dashboard)
                .addMediaGalleryComponents(
                    new MediaGalleryBuilder().addItems(
                        new MediaGalleryItemBuilder().setURL(
                            "https://media.discordapp.net/attachments/1264584269758468249/1408682025560309800/Blossom_Customs_Dashboard.png?ex=69ff6c9e&is=69fe1b1e&hm=a6df5b3db57ca52a8337f6f6a34c92311c4831fab4198dea39aab95a080b0bcb&=&format=webp&quality=lossless&width=2834&height=869"
                        )
                    )
                )
                // Separator before text
                .addSeparatorComponents(
                    new SeparatorBuilder()
                        .setDivider(false)
                        .setSpacing(SeparatorSpacingSize.Small)
                )
                // Main Content Text
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(
                        "Welcome to <:BlossomLogo:1326224460839391338> **Blossom Customs**, where we create designs that bloom. We are dedicated to developing high-quality products tailored to your needs, while keeping our services affordable for everyone."
                    )
                )
                // Separator after text
                .addSeparatorComponents(
                    new SeparatorBuilder()
                        .setDivider(false)
                        .setSpacing(SeparatorSpacingSize.Small)
                )
                // Buttons Section
                .addSectionComponents(
                    new SectionBuilder()
                        .setButtonAccessory(
                            new ButtonBuilder()
                                .setLabel("Regulations")
                                .setStyle(ButtonStyle.Secondary)
                                .setCustomId("p_300053456519958529")
                                .setEmoji("1502464181075574794")
                        )
                )
                .addSectionComponents(
                    new SectionBuilder()
                        .setButtonAccessory(
                            new ButtonBuilder()
                                .setLabel("Roblox Group")
                                .setStyle(ButtonStyle.Link)
                                .setURL("https://discohook.app/")
                                .setEmoji("1502464380594556948")
                        )
                )
                .addSectionComponents(
                    new SectionBuilder()
                        .setButtonAccessory(
                            new ButtonBuilder()
                                .setLabel("Designer Application")
                                .setStyle(ButtonStyle.Secondary)
                                .setCustomId("p_300053468297564163")
                                .setEmoji("1502464553919975494")
                        )
                )
                // Select Menu Section
                .addSectionComponents(
                    new SectionBuilder()
                        .setSelectMenuAccessory(
                            new StringSelectMenuBuilder()
                                .setCustomId("p_300055418153996294")
                                .setPlaceholder("Navigate")
                                .addOptions([
                                    { label: "Option 1", value: "opt_1" } // Added placeholder option as JSON options were empty
                                ])
                        )
                )
                // Separator before footer
                .addSeparatorComponents(
                    new SeparatorBuilder()
                        .setDivider(false)
                        .setSpacing(SeparatorSpacingSize.Small)
                )
                // Bottom Media Gallery (Blossom Customs footer)
                .addMediaGalleryComponents(
                    new MediaGalleryBuilder().addItems(
                        new MediaGalleryItemBuilder().setURL(
                            "https://media.discordapp.net/attachments/1264584269758468249/1408682021802348634/Blossom_Customs_footer_better.png?ex=69ff6c9e&is=69fe1b1e&hm=8b6c5258cd963692c66ac13e122f977080145eae0d16bc82becfcddae298a8a5&=&format=webp&quality=lossless&width=2834&height=218"
                        )
                    )
                )
        ];

        await message.reply({
            flags: MessageFlags.IsComponentsV2,
            components,
        });
    },
};