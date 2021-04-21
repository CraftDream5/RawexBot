const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {// chimp#0110 
  let m = ['ayarla','sıfırla']
  if(!args[0])return message.channel.send(`Bir seçenek belirtmelisin, \`ayarla / sıfırla\``)
  if(!m.includes(args[0])) return message.channel.send(`Sadece \`ayarla / sıfırla\` seçeneklerini kullanabilirsin.`)
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`⛔ Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout:100000}))
if(args[0] === "ayarla") {
    const asd = await data.fetch(`kanal.${message.guild.id}`)
  if(asd) return message.channel.send(`Sistemin kanalı zaten ayarlı: ${client.channels.cache.get(asd)}`)
  let ment = message.mentions.channels.first()
  if(!args[1]) return message.channel.send(`Bir kanal etiketlemelisin.`)
  if(!ment) return message.channel.send(`Etiketlediğin kanalı bulamıyorum.`)
  data.set(`kanal.${message.guild.id}`, ment.id)
  message.channel.send(`Davet logunun tutulacağı kanal ${ment} olarak ayarlandı.`)
}
    if(args[0] === 'sıfırla') {
  const asd = await data.fetch(`kanal.${message.guild.id}`)
  if(!asd) return message.channel.send(`Sistemin kanalı zaten ayarlı değil.`)

  data.delete(`kanal.${message.guild.id}`)
  message.channel.send(`Davet logunun tutulacağı kanal sıfırlandı.`)
  }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [''],
    permLevel: 0
};
exports.help = {
    name: 'invite-log'
};// codare