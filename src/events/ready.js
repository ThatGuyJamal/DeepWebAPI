// //here the event starts
// module.exports = async (client) => {
// 	console.log(`Discord Bot: ${client.user.tag} is online!`); //log when ready aka the bot usable
// 	await client.user.setActivity(`${client.users.cache.size} users!`, {
// 		type: "WATCHING",
// 	}); //first parameter, is the status, second is an object with type which can be: "PLAYING", "WATCHING", "LISTENING", "STREAMING" (where you need to add a , and then url: "https://twitch.tv/#")
// };
// //client.user.username
// //client.guilds.cache.size
// //client.users.cache.size

client.once("ready", async () => {
	console.log("Logging in to Discord... ");
	await console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity("with Javascript");
});
