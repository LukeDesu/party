const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "wasted",
  description: "spawning at the hospital...",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));

    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";

    const avatar = await Canvas.loadImage(user.displayAvatarURL({size: 1024, format: "png"}));
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Fwasted_overlay.png?v=1585815078798"
    );
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      user.username + "_wasted.png"
    );

    message.channel.send(attachment);
  }
};
