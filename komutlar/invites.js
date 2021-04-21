const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {// chimp#0110 
      if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
    
  let mention = message.mentions.users.first() || message.author
  if(!mention) return message.channel.send(`Etiketlediğin kişiyi bulamıyorum.`)
    
  const gerçek = await data.fetch(`chimp.${mention.id}.${message.guild.id}`)
  const sahte = await data.fetch(`fake.${mention.id}.${message.guild.id}`)
  const toplam = await data.fetch(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`)
  
  const embed = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle(`${mention.username}:`)
  .setDescription(`Toplam: ${toplam ? toplam : '0'} | Gerçek: ${gerçek ? gerçek : '0'} | Fake(sahte): ${sahte ? sahte : '0'}`)
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
    name: 'invites'
};// codare