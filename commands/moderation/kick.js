const Discord = require("discord.js");

module.exports = {
  name: "kick",
  description: "🔨",
  guildOnly: true,
  aliases: [],

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()

    var user = message.mentions.members.first(); // returns the user object if an user mention exists
    var banReason = args.slice(1).join(" "); // Reason of the ban (Everything behind the mention)
    if (user.id === message.author.id) return message.channel.send(cross + ' Hold on did you just try to kick yourself?');
    if (!message.member.hasPermission("KICK_MEMBERS")){
      return message.channel.send(cross + "You don't have the **Kick Members** permission!")
    }
    
    if (!message.member.hasPermission("KICK_MEMBERS")){
      return message.channel.send(cross + "You don't have the **Kick Members** permission!")
    }
    
    if (!message.guild.me.hasPermission('KICK_MEMBERS')){
      return message.channel.send(cross + "I don't have the **Kick Members** permission!")
    }
    
    if (!user) {
      try {
        if (!message.guild.members.get(args.slice(0, 1).join(" ")))
          throw new Error(cross + " I Couldn't find that user!");
          user = message.guild.members.get(args.slice(0, 1).join(" "));
          
        
      } catch (error) {
        console.log(error)
        return message.channel.send(cross + " **" + message.author.username + "**, You didn't provide a valid user to kick!");
        
      }
    }

    if (!message.guild.member(user).kickable) return message.reply(cross + ' I can\'t kick a moderator!');

    if (!banReason) {
      banReason = "Unspecified";
    }

    const banEmb = new Discord.MessageEmbed()
        .setColor("0xfeb637")
        .setAuthor("Kicked by " + message.author.username , message.author.displayAvatarURL({type: "png", size: 1024}))
        .setTitle(user.user.tag + " has been kicked!")
        .setThumbnail(user.user.displayAvatarURL({type: "png", size: 1024}))
        .addField("Reason:", banReason, true)
        .setTimestamp()
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");

        

  
         await user.kick(banReason)
          .then(
            message.channel.send(banEmb))
              .catch(console.error);
  }
};
