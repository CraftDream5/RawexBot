const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {// chimp#0110 
  
  let m = ['ayarla','sıfırla']
  if(!args[0])return message.channel.send(`Bir seçenek belirtmelisin, \`ayarla / sıfırla\``)
  if(!m.includes(args[0])) return message.channel.send(`Sadece \`ayarla / sıfırla\` seçeneklerini kullanabilirsin.`)
        if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`⛔ Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout:100000}))
if(args[0] === "ayarla") {
         let m = ['welcome','leave']
  if(!args[1])return message.channel.send(`Bir seçenek belirtmelisin, \`welcome / leave\``)
  if(!m.includes(args[1])) return message.channel.send(`Sadece \`welcome / leave\` seçeneklerini kullanabilirsin.`)
  if(args[1] === "welcome")
    {

    const asd = await data.fetch(`text.${message.guild.id}`)
  
let ment = args.join(" ").slice(14)
  if(!args[2]) return message.channel.send(`Bir text yazmalısın.`)

  data.set(`text.${message.guild.id}`, ment)
  message.channel.send(`Welcome mesajı başarıyla ayarlandı.`)}
    if(args[1] === "leave")
    {
    const asd = await data.fetch(`text2.${message.guild.id}`)
  
let ment = args.join(" ").slice(12)
  if(!args[2]) return message.channel.send(`Bir text yazmalısın.`)

  data.set(`text2.${message.guild.id}`, ment)
  message.channel.send(`Leave mesajı başarıyla ayarlandı.`)}
}
    if(args[0] === 'sıfırla') {
             let m = ['welcome','leave']
  if(!args[1])return message.channel.send(`Bir seçenek belirtmelisin, \`welcome / leave\``)
  if(!m.includes(args[1])) return message.channel.send(`Sadece \`welcome / leave\` seçeneklerini kullanabilirsin.`)
      if(args[1] === 'welcome') {
  const asd = await data.fetch(`text.${message.guild.id}`)
  if(!asd) return message.channel.send(`Welcome texti zaten ayarlı değil.`)

  data.delete(`text.${message.guild.id}`) 
  message.channel.send(`Welcome texti sıfırlandı.`)
      }
            if(args[1] === 'leave') {
  const asd = await data.fetch(`text2.${message.guild.id}`)
  if(!asd) return message.channel.send(`Leave texti zaten ayarlı değil.`)

  data.delete(`text2.${message.guild.id}`)
  message.channel.send(`Leave texti sıfırlandı.`)
      }
  }
}

exports.conf = {
    enabled: false,
    guildOnly: true,
    aliases: [''],
    permLevel: 0
};
exports.help = {
    name: 'invite-text'
};// codare