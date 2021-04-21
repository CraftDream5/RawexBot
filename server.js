const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
const db = require("quick.db");
require('./util/eventLoader.js')(client);



var prefix = ayarlar.prefix

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});


client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 1
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 2
    if (message.author.id === ayarlar.sahip) permlvl = 3
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token)
client.on("message", msg => {
  if(msg.content.startsWith('r!botekle') || msg.content.startsWith('r!bot-ekle')){
if (msg.channel.id == db.has(`bot-ekle_${msg.guild.id}`)) {
    if (msg.author.id == msg.client.user.id) return;

    msg.delete({timeout: 10000})}
    if (msg.channel.id !== db.has(`bot-ekle_${msg.guild.id}`)) return;
  }
})

client.on('message', msg => {
  if (msg.content === '<@!829726279459668069>') {
    msg.channel.send(new Discord.MessageEmbed().setDescription(`Merhaba Prefixim: **${prefix}**
Yardım İçin: **${prefix}yardım**

**__[Destek Sunucusu](https://discord.gg/nTuSYZ9xj5)__** | **__[Davet Linki](https://discordapp.com/oauth2/authorize?client_id=` + client.user.id + `&scope=bot&permissions=8)__** | **__[Oy Link](https://hlist.tk/bot/829726279459668069/vote)__**`))
  }
})



client.on("message", async msg => {
  
  
 const i = await db.fetch(`kufur_${msg.guild.id}`)
    if (i == "acik") {
        const kufur = ["oç", "skm", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak","amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {

            if (!msg.member.hasPermission("ADMINISTRATOR")) {
                  msg.delete();
                          
                      return msg.reply('<:personel:830075800854069319> Hey!, Bu sunucu `Rawex` tarafından korunuyor! Küfür etmene izin veremem!')
            }              
          } 
        
    }
    if (!i) return;
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  
  
 const i = db.fetch(`${oldMessage.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "skm", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => newMessage.content.includes(word))) {
 
            if (!oldMessage.member.hasPermission("ADMINISTRATOR")) {
                  oldMessage.delete();
                          
                      return oldMessage.reply('<:personel:830075800854069319> Hey!, Bu sunucu `Rawex` tarafından korunuyor! Küfür etmene izin veremem!')
            }              
          
        }
    }
    if (!i) return;
});

client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.cache.size) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`${message.guild.name} başarıyla \`${db.fetch(`sayac_${message.guild.id}`)}\` kullanıcıya ulaştı! Sayaç sıfırlandı!`)
      message.guild.owner.send(embed);
      db.delete(`sayac_${message.guild.id}`);
      db.delete(`sKanal_${message.guild.id}`);
    }
  }
});
client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`** \`${member.user.tag}\` adlı üye sunucudan ayrıldı! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!**`);
});
client.on("guildMemberAdd", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`:tada: ** \`${member.user.tag}\` adlı üye sunucuya Katıldı! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!**`);
});

client.on('message', async message => {// chimp'∞B#1008
  if(message.content.startsWith('r!afk')) return;
if(message.channel.type === 'dm') return;
if(await db.fetch(`afk.${message.author.id}.${message.guild.id}`) == undefined) return;
const ms = require('ms')

if(message.content.length > 0) {
const sebepp = await db.fetch(`sebep.${message.author.id}.${message.guild.id}`)
const sp = await db.fetch(`giriş.${message.author.id}.${message.guild.id}`)
const asd = await db.fetch(`display.${message.author.id}.${message.guild.id}`)

  let atılmaay = moment(Date.now()+10800000).format("MM")
  let atılmagün = moment(Date.now()+10800000).format("DD")
  let atılmasaat = moment(Date.now()+10800000).format("HH:mm:ss")
  let atılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``


message.guild.members.cache.get(message.author.id).setNickname(asd)
message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`Afk modundan başarıyla çıkış yaptın.`)
.addField('Giriş sebebin:', sebepp) 
.addField('AFK olma zamanın:', sp)
.addField('Çıkış zamanın:', atılma))
db.delete(`afk.${message.author.id}.${message.guild.id}`)
db.delete(`sebep.${message.author.id}.${message.guild.id}`)
db.delete(`giriş.${message.author.id}.${message.guild.id}`)
db.delete(`display.${message.author.id}.${message.guild.id}`)
}

})// codare ♥

function percentage(partialValue, totalValue) {
   return (100 * partialValue) / totalValue;
} 

client.on('message', async(message) => {
if (!message.guild) return
let acikmi = await db.fetch(`${message.guild.id}.capsengel`)
if (!acikmi) return;
if (message.author.bot) return;
if (message.member.hasPermission("ADMINISTRATOR")) return;
let matched = message.content.replace(/[^A-Z]/g, "").length
let yuzde = percentage(matched, message.content.length)
if (Math.round(yuzde) > acikmi.yuzde) {
  message.delete()
message.channel.send("<:personel:830075800854069319> Hey!, Bu sunucu `Rawex` tarafından korunuyor! Capslock açmana izin veremem!")
}else{return}
})

client.on("guildMemberRemove", async member => {
  //let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
  //const canvaskanal = member.guild.channels.cache.get(resimkanal[member.guild.id].resim);
  
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
  if (!canvaskanal) return;

  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucudan Ayrıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(1024, 300);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/831135767731765260/833321983499829279/33335.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#0f0f0f";
  ctx.strokeRect(25, 50, 200, 200);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(member.user.username, canvas.width / 1.4 - (ctx.measureText(member.user.username).width / 2), 230);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);


  ctx.drawImage(avatar, 25, 50, 200, 200);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ro-BOT-güle-güle.png"
  );

    canvaskanal.send(attachment);
    canvaskanal.send(
      msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
    );
    if (member.user.bot)
      return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
  
});

client.on("guildMemberAdd", async member => {
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));

  if (!canvaskanal || canvaskanal ===  undefined) return;
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucuya Katıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let paket = await db.fetch(`pakets_${member.id}`);
  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(1024, 300);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/831135767731765260/833321984708050994/3D_2_Sona_Droid.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(25, 50, 200, 200);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(member.user.username, canvas.width / 1.4 - (ctx.measureText(member.user.username).width / 2), 230);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) ;
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

ctx.drawImage(avatar, 25, 50, 200, 200);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ro-BOT-hosgeldin.png"
  );

  canvaskanal.send(attachment);
  canvaskanal.send(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
});

 client.on("message", async msg => {


  const i = await db.fetch(`ssaass_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 's.a' || msg.content.toLowerCase() == 'selamun aleyküm') {
          try {

                  return msg.reply('**Aleyküm Selam, Hoşgeldin!** ')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
    
    }
    if (!i) return;

    });

const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(codare => {
      invites[g.id] = codare;
    });
  });
});

client.on("guildMemberAdd", async member => {// chimp#0110
  
const data = require('quick.db')

const user = client.users.cache.get(member.id);
  
member.guild.fetchInvites().then(async codare => {
let channel = await data.fetch(`kanal.${member.guild.id}`);
if (!channel) return;

const ei = invites[member.guild.id];
invites[member.guild.id] = codare;

const seni_kim_davet_etti = await codare.find(i => (ei.get(i.code) == null ? (i.uses - 1) : ei.get(i.code).uses) < i.uses);
const ben_ettim = member.guild.members.cache.get(seni_kim_davet_etti.inviter.id);

data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, +1);
data.add(`toplambebeğiiiiim.${ben_ettim.id}.${member.guild.id}`, +1);
  
 let zaman = require("moment").duration(new Date().getTime() - client.users.cache.get(member.id).createdAt.getTime())
 if(zaman < 1296000000) { data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, -1);
 data.add(`fake.${ben_ettim.id}_${member.guild.id}`, +1); }
  
 data.set(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`, ben_ettim.id);
  
let ölç_bakalım = await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`);

let davetsayi;
if(!ölç_bakalım) { davetsayi = 0; } 
else { davetsayi = await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`); }
  const text1 = await data.fetch(`text.${member.guild.id}`)
  if(text1){const text1 = text1.replace('%uye_isim%', member.user.username).replace('%uye_etiket%', `<@${member.id}>`).replace('%sunucu%', member.guild.name).replace('%davet_sayi%', davetsayi ? davetsayi : 0).replace('%davet_eden_isim%', ben_ettim.user.username).replace('%davet_eden_etiket%', `<@${ben_ettim.id}>`)}

  if(zaman < 1296000000){
member.guild.channels.cache.get(channel).send(`**${member.user.username}**, sunucuya katıldı. Onu **${ben_ettim.user.tag}**(**${davetsayi}**) davet etti.`)

} else {
member.guild.channels.cache.get(channel).send(`**${member.user.username}**, sunucuya katıldı. Onu **${ben_ettim.user.tag}**(**${davetsayi}**) davet etti.`)

  }});
});// codare

client.on("guildMemberRemove", async member => {// chimp#0110

const data = require('quick.db')

const user = client.users.cache.get(member.id);
  
member.guild.fetchInvites().then(async codare => {
let channel = await data.fetch(`kanal.${member.guild.id}`);
if (!channel) return;
const seni_kim_davet_etti = await data.fetch(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`);
const ben_ettim = member.guild.members.cache.get(seni_kim_davet_etti);
  
let zaman = require("moment").duration(new Date().getTime() - client.users.cache.get(member.id).createdAt.getTime())

if(zaman < 1296000000){
  data.add(`fake.${ben_ettim.id}.${member.guild.id}`, -1);
  data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, -1);
  if(seni_kim_davet_etti) {
  data.delete(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`); }
} else {
  data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, -1);
  if(seni_kim_davet_etti) {
  data.delete(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`); } }
  
const davetsayi = await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`);
  
  const text2 = await data.fetch(`text2.${member.guild.id}`)
  if(text2){const text2 = await text2.replace('%uye_isim%', member.user.username).replace('%uye_etiket%', `<@${member.id}>`).replace('%sunucu%', member.guild.name).replace('%davet_sayi%', davetsayi ? davetsayi : 0).replace('%davet_eden_isim%', ben_ettim.user.username).replace('%davet_eden_etiket%', `<@${ben_ettim.id}>`)}

if(zaman < 1296000000){
if(!seni_kim_davet_etti) {
return member.guild.channels.cache.get(channel).send(`**${member.user.username}**, sunucudan ayrıldı. Davet eden bulunamadı.`)

} else {
member.guild.channels.cache.get(channel).send(`**${member.user.username}**, sunucudan ayrıldı. Onu **${ben_ettim.user.tag ? ben_ettim.user.tag : "Davet eden bulunamadı."}**(**${davetsayi ? davetsayi : '0'}**) davet etmişti.`)
}

} else {
if(!seni_kim_davet_etti) {
return member.guild.channels.cache.get(channel).send(`**${member.user.username}**, sunucudan ayrıldı. Davet eden bulunamadı.`)
} else {
member.guild.channels.cache.get(channel).send(`**${member.user.username}**, sunucudan ayrıldı. Onu **${ben_ettim.user.tag ? ben_ettim.user.tag : "Davet eden bulunamadı."}**(**${davetsayi ? davetsayi : '0'}**) davet etmişti.`) 
}

}
})
});// codaree