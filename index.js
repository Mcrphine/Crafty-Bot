const fs = require('node:fs');
const path = require('node:path');
const prefix = "-";
const { Client, Discord, Intents, Collection, GatewayIntentBits, ClientPresence, Events } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
] });

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Crafty Bot is up and running!');
});

client.on("messageCreate", message => {
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);
        if(!command) return message.channel.send({content: "I don't recognize that command."});
        command.execute(client, message, args);
    }
});

client.on("interactionCreate", async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.login('MTA2MTEwMDU0MDY4MDk5NDgyNg.GkYBpX.4vf6bo5BLf0_8v328m9dShlmk0gbHO6woBX6uY');

