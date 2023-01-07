module.exports = {
    name: "crafty",
    usage: "crafty",
    description: "Responds with basic bot information",
    execute: async (client, message, args) => {
        message.channel.send("At your service!");
        message.channel.send("Created by **TheLastBeacon**.");
    }
}