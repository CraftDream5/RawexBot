const Emran = require('discord.js');

exports.run = async (client, message, args) => {
  	          const ayarlar = require('../ayarlar.json')
				    let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix

    
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
var role = message.mentions.roles.first() || message.guild.roles.cache.find(a => a.name == args.slice(1).join(' '));
if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`⛔ Bu komutu kullanabilmek için \`Rolleri Yönet\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout:100000}))
if (!member) return message.channel.send('Lütfen bir kullanıcıyı etiketleyin.');
if (!role) return message.channel.send('Verilecek rolü belirtin.');
  if (message.member.roles.highest.comparePositionTo(role) < 1) {
if(message.member !== message.guild.owner) return message.channel.send(`Verilecek rol sizin rolünüzün üstünde bu yüzden rolü **veremiyorum!**`);
  }

await (member.roles.add(role.id))
 message.channel.send(new Emran.MessageEmbed().setDescription(`${member} isimli üyeye \`${role.name}\` isimli rol başarıyla verildi!`).setTimestamp().setColor('#D2EE07'));
  

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolver'],
  permLevel: 0
};

exports.help = {
  name: 'rol-ver',
  description: 'Belirttiğiniz kullanıcıya belirttiğiniz rolü verir.',
  usage: 'rol-ver'
};