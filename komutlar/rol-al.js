const emran = require('discord.js');

exports.run = async (client, message, args) => {
    const ayarlar = require('../ayarlar.json')
            let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix

        
var member = message.mentions.members.first();
var role = message.mentions.roles.first() || message.guild.roles.cache.find(a => a.name == args.slice(1).join(' '));
if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`⛔ Bu komutu kullanabilmek için \`Rolleri Yönet\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout:100000}))
if (!member) return message.channel.send('Lütfen bir kullanıcıyı etiketleyin veya ismini yazın.');
if (!role) return message.channel.send('Alınacak rolü belirtin.');
    if (!member.roles.cache.has(role.id)) return message.channel.send(new emran.MessageEmbed().setDescription('Kullanıcı O Role Sahip Değil.').setColor('#D2EE07'));
  if (message.member.roles.highest.comparePositionTo(role) < 1) {
if(message.member !== message.guild.owner) return message.channel.send(`Verilecek rol sizin rolünüzün üstünde bu yüzden rolü **alamıyorum!**`);
  }
await (member.roles.remove(role.id))
 message.channel.send(new emran.MessageEmbed().setDescription(`${member} isimli üyenin \`${role.name}\` isimli rolü başarıyla alındı!`).setTimestamp().setColor('#D2EE07'));
    
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolal'],
  permLevel: 0
};

exports.help = {
  name: 'rol-al',
  description: 'Belirttiğiniz kullanıcıdan belirttiğiniz rolü alır.',
  usage: 'rol-al'
};