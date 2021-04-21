const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {// chimp#0110    
  if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  let mention = message.mentions.users.first() || message.author
  if(!mention) return message.channel.send(`Etiketlediğin kişiyi bulamıyorum.`)
  const asd = await data.fetch(`seni_kim_davet_etti?.${mention.id}.${message.guild.id}`)
  if(!asd) return message.channel.send(`Davet eden kişi bulunamadı.`)
    
  const embed = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle(`${mention.username}:`)
  .setDescription(`Davet eden: ${client.users.cache.get(asd)}`)
  .setColor('BLUE')
  .setTimestamp()
  message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [''],
    permLevel: 0
};
exports.help = {
    name: 'who-invited'
};// codare