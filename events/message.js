const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
let talkedRecently = new Set();

module.exports = message => {

  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
    if(cmd) {
  const db = require('quick.db')
  if(message.author.id !== ayarlar.sahip){
  const sa =  db.fetch(`asd.${message.author.id}`)
  if(sa) return message.channel.send(`<:no:829739143625441290> Komutlarımı Her \`4\` Saniyede Bir Kullanabilirsin.`)
  if(!sa) {
  db.set(`asd.${message.author.id}`, 'as')}
  setTimeout(async () => {
  db.delete(`asd.${message.author.id}`)
  }, 4000)}
  }
  /* if(cmd) kısmının üzerine bunu yazıyorsunuz */
  if(cmd && cmd.help.name !== 'bakım') {
    if(message.author.id !== ayarlar.sahip) {
  const neblmölçmedimikamk =  require('quick.db').fetch(client.user.id);
  if(neblmölçmedimikamk == true) {
  var DURATION = require('humanize-duration');
  const chimped =  db.fetch(client.user.id+':)');
  var TIMESTAMP = Date.now() - chimped.time;
  var RESULT = DURATION(TIMESTAMP, { language: 'tr', round: true, conjunction: ', ', serialComma: false });
  message.react('❌');
  return message.reply(`Merhaba Botumuz Bakımda Olduğu İçin Hiçbir Komutu Kullanamassınız. \nYaklaşık ***${RESULT} önce*** bakıma alınmış.\nBakıma alan: ***${chimped.author.tag}***`);
  }
  };
  };
    if(cmd) {
  if(message.author.id !== ayarlar.sahip) {
  if(db.fetch(message.guild.owner.user.id) && !db.fetch(message.author.id)) return message.channel.send('<:bug1:830074369677197372> Bu sunucunun sahibi botun karalistesinde. O yüzden sende komut kullanamazsın.'); 
  if(db.fetch(message.author.id)) return message.channel.send('<:bug1:830074369677197372> Sen botun karalistesindesin. Komutları kullanamazsın.');
  };
  };
  if (cmd) {
    
    
   if (cmd.conf.enabled === false) {
      if (!ayarlar.sahip && !ayarlar.sahip) {
        const embed = new Discord.MessageEmbed()
                    .setDescription(`<:no:829739143625441290> **${cmd.help.name}** isimli komut şuanda geçici olarak kullanıma kapalıdır!`)
                    .setColor("RED")
                message.channel.send({embed})
                return
      
      }
   }
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }


};