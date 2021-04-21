const Discord = require("discord.js");
const talkedRecently = new Set();

exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`⛔ Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın.`).then(msg => msg.delete({timeout:100000}))
         if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
const bans = new Map();
            message.guild.fetchBans().then(g => {
                bans[g.id] = g;
                let banlist = (`${bans[g.id].map(ge => `\n (${ge.user.tag}) (${ge.user.id})`).join('\n')}`)
                        try {     
                let noembed = new Discord.MessageEmbed()
  .setColor('#0070FF')
                .setDescription(`Bu Sunucuda Yasaklı Kullanıcı Bulunmuyor.`)
                .setAuthor(message.guild.name).setTimestamp()

                if(banlist.length === 0) return message.channel.send(noembed)
                const embed = new Discord.MessageEmbed()
                    .setDescription(banlist)
                    .setAuthor(message.guild.name)
                .setColor('#0070FF').setTimestamp()
                message.channel.send(embed)
                      } catch (err) {
        const embed = new Discord.MessageEmbed()
            .addField(`Sunucuda Bulunan Yasaklılar`, 'Üzgünüm ama sunucunuzda fazla sayıda yasaklı kullanıcı bulunuyor Bu Yüzden gösteremiyorum. Discord buna izin vermiyor.')
            .setColor('RED')
            .setTimestamp()
        message.channel.send(embed)
                      }

        });
    }
                                           
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yasak-listesi'],
  permLevel: 0
};

exports.help = {
  name: 'banlist',
  description: 'Sunucudaki Yasaklı Kullanıcıları Gösterir.',
  usage: 'banlist',
 
};