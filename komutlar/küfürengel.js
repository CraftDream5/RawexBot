
const db = require('quick.db')
const Discord = require('discord.js')
 let ayarlar = ['aç','kapat']
exports.run = async (bot, message, args) => {
    if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  if (!args[0]) return message.channel.send('Hey!, Bu ayarı kullanabilmek için `aç` yada `kapat` yazmalısın.')
  if(!ayarlar.includes(args[0])) return message.channel.send(`Geçerli parametreleri kullanmalısın.\nParametreler: ${ayarlar.join(' - ')}`)
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('⛔ Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.').then(msg => msg.delete({timeout:100000}))   
 
  if (args[0] == 'aç') {
    if(db.has(`kufur_${message.guild.id}`)) return message.channel.send(`<:personel:830075800854069319> Sistem zaten açık.`)
    db.set(`kufur_${message.guild.id}`, 'acik')
      message.channel.send('<:personel:830075800854069319> Küfür Engel başarıyla açıldı! `Yönetici` yetkisine sahip olanların reklamı engellenmiyecektir.')
  }
  if (args[0] == 'kapat') {
        if(!db.has(`kufur_${message.guild.id}`)) return message.channel.send(`<:personel:830075800854069319> Sistem zaten kapalı.`)
    db.delete(`kufur_${message.guild.id}`)
      message.channel.send('<:personel:830075800854069319> Küfür Engel başarıyla kapatıldı!')
  }
 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['küfürengel'],
  permLevel: 0
};
 
exports.help = {
  name: 'küfür-engel',
  description: '[Admin Komutu]',
  usage: 'reklam-engelle'
};