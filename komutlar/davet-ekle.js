const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {// chimp#0110 
      if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`⛔ Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout:100000}))
  let mention = message.mentions.users.first()
  if(!args[0]) return message.channel.send(`Birini etiketlemelisin.`)
  if(!mention) return message.channel.send(`Etiketlediğin kişiyi bulamıyorum.`)
    
  if(!args[1]) return message.channel.send(`${mention} kişinin hangi davetlerini ekleyeceğini belirtmelisin: toplam/gerçek/sahte`)
  let yo = ['toplam', 'gerçek', 'sahte']
  if(!yo.includes(args[1])) return message.channel.send(`Sadece, toplam/gerçek/sahte davetlerini ekleyebilirsin.`)
  
  const say_baştan = await data.fetch(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`)
    
  if(args[1] === 'toplam') {
  const say_baştan = await data.fetch(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`)
    
  if(!args[2]) return message.channel.send(`Ne kadar davet ekleyeceğini de yazmalısın..`)
  if(isNaN(args[2])) return message.channel.send(`Sadece sayı girebilirsin.`)

  message.channel.send(`${mention} kişisine ${args[2]} kadar **toplam** davet eklendi.`)
  data.add(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`, args[2]) } 
  
  if(args[1] === 'gerçek') {
  const say_baştan = await data.fetch(`chimp.${mention.id}.${message.guild.id}`)
    
  if(!args[2]) return message.channel.send(`Ne kadar davet ekleyeceğini de yazmalısın..`)
  if(isNaN(args[2])) return message.channel.send(`Sadece sayı girebilirsin.`)
 
    
  const gerçek = await data.fetch(`chimp.${mention.id}.${message.guild.id}`)

  message.channel.send(`${mention} kişisine ${args[2]} kadar **gerçek** davet eklendi.`)
  data.add(`chimp.${mention.id}.${message.guild.id}`, args[2]) } 
  
  if(args[1] === 'sahte') {
  const say_baştan = await data.fetch(`fake.${mention.id}.${message.guild.id}`)
    
  if(!args[2]) return message.channel.send(`Ne kadar davet ekleyeceğini de yazmalısın..`)
    if(isNaN(args[2])) return message.channel.send(`Sadece sayı girebilirsin.`)

    
  const sahte = await data.fetch(`fake.${mention.id}.${message.guild.id}`)

  message.channel.send(`${mention} kişisine ${args[2]} kadar **sahte** davet eklendi.`)
  
  data.add(`fake.${mention.id}.${message.guild.id}`, args[2])}
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [''],
    permLevel: 0
};
exports.help = {
    name: 'add'
};// codare