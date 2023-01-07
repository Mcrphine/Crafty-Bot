module.exports = {
    name: "ip",
    usage: "ip",
    description: "Responds with the server IP address.",
    execute: async (client, message, args) => {
        message.channel.send("**play.craftycaverns.net** version **1.19.3**");
    }
}