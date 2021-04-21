const Discord = require('discord.js');
const moment = require('moment');
moment.locale('tr');

exports.run = (client, message, args) => {// can ♡ b#1010
     if (!message.guild) return message.channel.send("Bu Komutu Sadece Sunucularda Kullanabilirsiniz.")
let mention = message.author;
if(message.mentions.members.first()) mention = message.mentions.members.first().user;
let mentionMember = message.guild.members.cache.get(mention.id);

let slm = {
  web: 'İnternet Tarayıcısı',
  desktop: 'Bilgisayar',
  mobile: 'Mobil'
}
let oyunlar = [];
mention.presence.activities.forEach(slm => {
if(slm.type === 'CUSTOM_STATUS') {
oyunlar.push(`${slm.emoji ? slm.emoji : ''} ${slm.state}`);
} else {
oyunlar.push(`**${slm.name}** ${slm.type.replace('PLAYING', 'oynuyor').replace('STREAMING', 'yayınlıyor').replace('LISTENING', 'dinliyor').replace('WATCHING', 'izliyor')}`)
}});

let nitroDurum = false;
if(mention.presence.activities[0]) {
if(mention.presence.activities[0].emoji) {
if(mention.presence.activities[0].emoji.animated) nitroDurum = true;
};
};

let rozetler = false;
if(mention.flags.toArray().length < 0) {
rozetler = false;
} else {
rozetler = true;
};

let mentionFlags = mention.flags.toArray().join(', ')
.replace('HOUSE_BRAVERY', '<:bravery:830075039340429363>')  
.replace('HOUSE_BRILLIANCE', '<:brilliance:830075686324666463>')
.replace('HOUSE_BALANCE', '<:balance:830074909899751484>')
.replace('VERIFIED_DEVELOPER', '<:dev:830074467408412713>')
.replace('DISCORD_EMPLOYEE', '<:personel:830075800854069319>')
.replace('PARTNERED_SERVER_OWNER', '<:partner:830074507862605884>')
.replace('HYPESQUAD_EVENTS', '<:events:830075404713853008>')
.replace('BUGHUNTER_LEVEL_1', '<:bug1:830074369677197372>')
.replace('EARLY_SUPPORTER', '<:early:830074849338327042>')
.replace('BUGHUNTER_LEVEL_2', '<:bug2:830074428637315073>')
.replace('VERIFIED_BOT', '<:onay:830824434910232587><:bot:830824491331354675>')

const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setAuthor(mention.tag, mention.avatarURL({dynamic: true}))
.setThumbnail(mention.avatarURL({dynamic: true}))
.addField('Durum', mention.presence.status.replace('online', 'Çevrimiçi').replace('idle', 'Boşta').replace('dnd', 'Rahatsız Etmeyin').replace('offline', 'Çevrimdışı'), true)
.addField('Ad', mention.username+` (${mention})`, true)
.addField('Takma Ad', mentionMember.displayName, true)
.addField('Sunucuya Katılma Tarihi', moment(mentionMember.joinedAt).format('D MMMM YYYY'), true)
.addField('Discorda Kayıt Tarihi', moment(mention.createdAt).format('D MMMM YYYY'), true)
.addField('Aktivite', oyunlar.join('\n') ? oyunlar.join('\n') : 'Hiç yok.')
.addField('Roller', mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') : 'Hiç yok.')
.addField('Rozetler', `${mentionFlags ? mentionFlags : 'Hiç yok.'}`)
.addField('Kullanıcı Kimliği', mention.id)
.setTimestamp();

message.channel.send(embed);
}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcıbilgi'],
  permLevel: 0
};
 
exports.help = {
  name: 'kb'
};// codare ♥