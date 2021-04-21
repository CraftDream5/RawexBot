const Discord = require('discord.js');

const moment = require('moment');
require('moment-duration-format');
exports.run = async (client, message, args) => {
  if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
message.channel.send(`Bot gecikmesi, **${Math.round(client.ws.ping)}\**ms`)
  
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: ' ',
  usage: ''
};