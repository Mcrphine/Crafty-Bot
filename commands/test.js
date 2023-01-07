const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Replies with success!'),
	async execute(interaction) {
		return interaction.reply('Success!');
	},
};