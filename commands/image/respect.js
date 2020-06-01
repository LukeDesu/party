const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "respect",
  description: "respect++++++++",
  guildOnly: false,
  aliases: ["mission", "gtasa"],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "))
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");

    
    

    
    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Frespect_overlay.png?v=1587301476158"
    );
    ctx.globalAlpha = 1;
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.Attachment(canvas.toBuffer(), user.username + "_respect.png");

    message.channel.send(attachment);
  }
};
