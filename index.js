const Discord = require('discord.js');
const client = (global.client = new Discord.Client({fetchAllMembers: true, partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'] }));
require('discord-reply')
const ayarlar = require('./ayarlar.json');
const disbut = require('discord-buttons')
disbut(client);


const { MessageButton, MessageActionRow } = require('discord-buttons')

client.cooldowns = new Discord.Collection()

const { readdirSync } = require('fs');
const fs = require("fs");
const { join } = require('path')
const db = require('quick.db')
const { Client, MessageEmbed,  MessageAttachment } = require('discord.js'); 
const moment = require("moment");
client.setMaxListeners(0)

client.commands = new Discord.Collection();


const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js")); 
for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`));
   if (typeof command.kod === 'object') {
     command.kod.forEach(x => {
       client.commands.set(x, command)
     })
   } else {
     client.commands.set(command.kod, command)
   }
}


client.on("message", async message => {
  if (!message.guild) return;
  var prefix = "r!"
  if(message.author.bot) return;

  if(message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);

      const command = args.shift().toLowerCase();

      if (!client.commands.has(command)) return;


      try {
          client.commands.get(command).run(client, message, args);

      } catch (error){
          console.error(error);
      }
  }
})


client.on('clickButton', async button => {
    await button.clicker.fetch()
  if (button.id == "destek") { 
    const channel = button.guild.channels.cache.filter(a => a.type === "text").find(c => c.topic === `${button.clicker.user.id}`)
    if (channel) return button.reply.send(`${button.clicker.user}, zaten açılmış bir destek talebin var! Kanal: ${channel}`, true)

    button.guild.channels.create(`destek-${button.clicker.member.displayName}`, { 
        parent: "955590930486935582",
        type: "text",
            topic: `${button.clicker.user.id}`,
            permissionOverwrites: [{
                id: button.clicker.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
              },
              {
                id: "958460000051814422",
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
              },
              {
                id: button.guild.id,
                deny: ['VIEW_CHANNEL'],
              },
            ],
    }).then(channel => {
        button.reply.send(`Başarıyla talebin oluşturuldu! ${channel} kanalından görüntüleyebilirsin.`, true)
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Yeni bir talep`, button.clicker.user.displayAvatarURL({dynamic: true}))
    .setDescription(`
        Merhaba ${button.clicker.user}, başarıyla talebin oluşturuldu!
    
        Bu kanaldan destek almak istediğin konuyu söyleyerek destek alabilirsin.
        `)
        .addField('Seçilen Alan', `Destek`, true)
      .addField('Oluşturulma Tarihi', `${moment().format('LL - LTS')}`, true)
    .setColor('BLUE')
    .setThumbnail(button.clicker.user.displayAvatarURL({dynamic: true}))
    const button3  = new MessageActionRow().addComponents(
      new MessageButton()
          .setLabel('Talebi Kapat')
          .setID("kapat")
          .setStyle('blurple'))
    
    channel.send({
      embed: embed,
      components: button3
    }).then(a => {
      a.pin()
    })
    setTimeout(() => {
    channel.send(`${button.clicker.user} talebin burada! Sana nasıl yardımcı olabiliriz?`)
    }, 1200)
              
          })
}

if (button.id == "satınalım") {
  const channel = button.guild.channels.cache.filter(a => a.type === "text").find(c => c.topic === `${button.clicker.user.id}`)
    if (channel) return button.reply.send(`${button.clicker.user}, zaten açılmış bir destek talebin var! Kanal: ${channel}`, true)

    button.guild.channels.create(`satınalım-${button.clicker.member.displayName}`, { 
        parent: "955590930486935582",
        type: "text",
            topic: `${button.clicker.user.id}`,
            permissionOverwrites: [{
                id: button.clicker.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
              },
              {
                id: "958460000051814422",
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
              },
              {
                id: button.guild.id,
                deny: ['VIEW_CHANNEL'],
              },
            ],
    }).then(channel => {
        button.reply.send(`Başarıyla talebin oluşturuldu! ${channel} kanalından görüntüleyebilirsin.`, true)
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Yeni bir talep`, button.clicker.user.displayAvatarURL({dynamic: true}))
    .setDescription(`
        Merhaba ${button.clicker.user}, başarıyla talebin oluşturuldu!
    
        Bu kanaldan destek almak istediğin konuyu söyleyerek destek alabilirsin.
        `)
        .addField('Seçilen Alan', `Satın Alım`, true)
      .addField('Oluşturulma Tarihi', `${moment().format('LL - LTS')}`, true)
    .setColor('BLUE')
    .setThumbnail(button.clicker.user.displayAvatarURL({dynamic: true}))
    const button3  = new MessageActionRow().addComponents(
      new MessageButton()
          .setLabel('Talebi Kapat')
          .setID("kapat")
          .setStyle('blurple'))
    
    channel.send({
      embed: embed,
      components: button3
    }).then(a => {
      a.pin()
    })
    setTimeout(() => {
    channel.send(`${button.clicker.user} talebin burada! Sana nasıl yardımcı olabiliriz?`)
    }, 1200)
              
          })
}

if (button.id == "diğer") {
  const channel = button.guild.channels.cache.filter(a => a.type === "text").find(c => c.topic === `${button.clicker.user.id}`)
    if (channel) return button.reply.send(`${button.clicker.user}, zaten açılmış bir destek talebin var! Kanal: ${channel}`, true)

    button.guild.channels.create(`Diğer-${button.clicker.member.displayName}`, { 
        parent: "955590930486935582",
        type: "text",
            topic: `${button.clicker.user.id}`,
            permissionOverwrites: [{
                id: button.clicker.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
              },
              {
                id: "958460000051814422",
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
              },
              {
                id: button.guild.id,
                deny: ['VIEW_CHANNEL'],
              },
            ],
    }).then(channel => {
        button.reply.send(`Başarıyla talebin oluşturuldu! ${channel} kanalından görüntüleyebilirsin.`, true)
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Yeni bir talep`, button.clicker.user.displayAvatarURL({dynamic: true}))
    .setDescription(`
        Merhaba ${button.clicker.user}, başarıyla talebin oluşturuldu!
    
        Bu kanaldan destek almak istediğin konuyu söyleyerek destek alabilirsin.
        `)
        .addField('Seçilen Alan', `Diğer`, true)
      .addField('Oluşturulma Tarihi', `${moment().format('LL - LTS')}`, true)
    .setColor('BLUE')
    .setThumbnail(button.clicker.user.displayAvatarURL({dynamic: true}))
    const button3  = new MessageActionRow().addComponents(
      new MessageButton()
          .setLabel('Talebi Kapat')
          .setID("kapat")
          .setStyle('blurple'))
    
    channel.send({
      embed: embed,
      components: button3
    }).then(a => {
      a.pin()
    })
    setTimeout(() => {
    channel.send(`${button.clicker.user} talebin burada! Sana nasıl yardımcı olabiliriz?`)
    }, 1200)
              
          })
}
 
});

client.on('clickButton', async button => {
    await button.clicker.fetch()
    if (button.id == "kapat") {
      button.channel.delete().catch(err => {})
    }
}) 

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam Hoşgeldin');
  }
});

client.login(ayarlar.token)