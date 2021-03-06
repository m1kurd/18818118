const Discord = require("discord.js")

module.exports.run = async(client,message,args)=> {

    let user;
    if(args[0] &&isNaN(args[0])) user = message.mentions.users.first()
if(args[0] && !isNaN(args[0])){
    user = client.users.cache.get(args[0])

    if(!message.guild.members.cache.has(args[0])) return message.reply(":x: User not found")
}

if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(":x: You need the **Kick_Members** authority to use this command")

if(!user) return message.reply(":x: You should **mention user** or enter userID")
let reason = args.slice(1).join(" ");
if(reason.lenght < 1 || !reason) return message.reply(":x: You must enter a reason")
if(reason.lenght > 256) return message.reply(":x: You can use a maximum of 256 characters in reason")


if(!message.guild.member(user).kickable) return message.reply("I can't kick authorities!")
message.guild.member(user).kick(reason)
.catch(e => message.reply(e))
message.reply(`${user.tag} has been kicked from server \n Reason: ${reason}`)

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:["k"]
}

exports.help = {
    name:"kick",
    description:"Kick user from server",
    usage:"kick @user / kick userID",
    category:"moderation"
}