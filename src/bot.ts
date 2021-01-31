const Commando = require("discord.js-commando");
const path = require("path");
const config = require("./config.json");
const prefix = config.prefix;
const join = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const { Intents, MessageEmbed } = require("discord.js");

const client = new Commando.Client({
	owner: "",
	commandPrefix: "",
	invite: "https://discord.gg/NbqBQbaejS",
	disableMentions: "everyone",
	partials: ["GUILD_MEMBER", "MESSAGE", "REACTION", "USER", "CHANNEL"],
	//ws: { intents: [Intents.NON_PRIVILEGED, "GUILD_MEMBERS"] }, //! If enabled it will stop intents
});

client.registry
	.registerDefaultTypes({})
	.registerGroups([
		["test", "A Testing group for developer commands."],
		//	["", ""],
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		
	})
	.registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", async () => {
	console.log("Logging in to Discord... ");
	await console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity("with Typecript");
});

//! Commando Database Struct
const { mongo } = require("mongoose");
const mongoose = require("./db/mongo");


// passins the mongo file proporties
client.mongoose = require("./db/mongo");
// Connects to mongo
client.mongoose.init();

client.on("message", async (message) => {
	const Setprefix = message.guild
		? message.guild.commandPrefix
		: client.commandPrefix;

	if (!message.content.startsWith(Setprefix) || message.author.bot) return;
});

// client.on errors
client.on("warn", (info) => console.log(info));
client.on("error", console.error);
// connects to discord client token
client.login(config.token);
