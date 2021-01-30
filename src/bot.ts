const Commando = require("discord.js-commando");
const path = require("path");
const config = require("./config.json");
const prefix = config.prefix;
const join = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const { Intents, MessageEmbed } = require("discord.js");

const client = new Commando.Client({
	owner: "370637638820036608",
	commandPrefix: "?",
	invite: "https://discord.gg/NbqBQbaejS",
	disableMentions: "everyone",
	partials: ["GUILD_MEMBER", "MESSAGE", "REACTION", "USER", "CHANNEL"],
	ws: { intents: [Intents.NON_PRIVILEGED, "GUILD_MEMBERS"] },
});

client.registry
	.registerDefaultTypes({})
	.registerGroups([
		["test", "A Testing group for developer commands."],
		["main", "Gneral commands to be used by anyone."],
		["info", "information on the bot."],
		["config", "Lets a server admin configer the bot."],
		["images", "image commands."],
		["owner", "owner only commands."],
		["moderation", "moderator commands."],
		["server", "Commands that show server information."],
		//	["", ""],
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		help: false,
		ping: false,
		eval: true,
		prefix: false,
		commandState: true,
		unknownCommand: false,
	})
	.registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", async () => {
	console.log("Logging in to Discord... ");
	await console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity("with Javascript");
});

//! Database Struct
const { mongo } = require("mongoose");
const mongoose = require("./db/mongo");
const MongoClient = require("mongodb").MongoClient;
const MongoDBProvider = require("commando-provider-mongo").MongoDBProvider;
client
	.setProvider(
		MongoClient.connect(config.db).then(
			(client) => new MongoDBProvider(client, "dev-build")
		)
	)
	.catch(console.error);
// passins the mongo file proporties
client.mongoose = require("./db/mongo");
// Connects to mongo
client.mongoose.init();

// client.on errors
client.on("warn", (info) => console.log(info));
client.on("error", console.error);
// connects to discord client token
client.login(config.token);
