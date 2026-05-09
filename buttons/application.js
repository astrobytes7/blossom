const {
    ModalBuilder,
    LabelBuilder,
    TextInputBuilder,
    TextInputStyle,
    FileUploadBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} = require('discord.js');

module.exports = {
    customID: 'application',
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('designer_application_modal')
            .setTitle('Designer Application')
            .setLabelComponents(
                new LabelBuilder()
                    .setLabel('Select your design specialties.')
                    .setStringSelectMenuComponent(
                        new StringSelectMenuBuilder()
                            .setCustomId('app_specialty')
                            .setPlaceholder('Choose all that apply')
                            .setMinValues(1) // Allows multiple choice
                            .setMaxValues(7) // Maximum number of options
                            .addOptions(
                                new StringSelectMenuOptionBuilder().setLabel('Liveries').setValue('liveries'),
                                new StringSelectMenuOptionBuilder().setLabel('Clothing').setValue('clothing'),
                                new StringSelectMenuOptionBuilder().setLabel('Discord').setValue('discord'),
                                new StringSelectMenuOptionBuilder().setLabel('Graphics').setValue('graphics'),
                                new StringSelectMenuOptionBuilder().setLabel('Photography').setValue('photography'),
                                new StringSelectMenuOptionBuilder().setLabel('ELS').setValue('els'),
                                new StringSelectMenuOptionBuilder().setLabel('Other').setValue('other')
                            )
                    ),
                // Question 1: Why?
                new LabelBuilder()
                    .setLabel('What is your motivation to become a designer?')
                    .setTextInputComponent(
                        new TextInputBuilder()
                            .setCustomId('app_why')
                            .setPlaceholder('Describe your motivation and vision...')
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                    ),

                // Question 2: Experience
                new LabelBuilder()
                    .setLabel('Have you had previous experience designing?')
                    .setTextInputComponent(
                        new TextInputBuilder()
                            .setCustomId('app_exp')
                            .setPlaceholder('Previous studios, clients, or projects...')
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                    ),

                // Question 3: Specialty/Skills
                new LabelBuilder()
                    .setLabel("What's your activity level? \(1-10\)")
                    .setTextInputComponent(
                        new TextInputBuilder()
                            .setCustomId('app_act')
                            .setPlaceholder('1-10')
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                    ),


                // Question 5: File Upload
                new LabelBuilder()
                    .setLabel('Please attach your past work.')
                    .setFileUploadComponent(
                        new FileUploadBuilder()
                            .setCustomId('app_portfolio')
                    )
            );

        await interaction.showModal(modal);
    }
};
