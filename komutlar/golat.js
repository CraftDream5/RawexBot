 const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
  if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
      const sunucubilgi = new Discord.MessageEmbed()
    .setAuthor('10 Nolu Formaya Sahip ' + message.author.username + ' Vurdu Veeeeee Goooooooooool! ')
    .setColor(3447003)
    .setTimestamp()
    .setDescription('')
        .setImage(`https://i.gifer.com/Firv.gif`)
    return message.channel.send(sunucubilgi);
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'golat',
  description: 'Gol Atarsınız',
  usage: 'golat'
};