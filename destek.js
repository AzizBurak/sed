const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
const moment = require('moment')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const { MessageButton, MessageActionRow } = require('discord-buttons')

module.exports = {
    kod: ["destek"],
    async run (client, message, args) {
        if (message.channel.type == "dm") return;
        if (message.author.id !== "538354326838575134") return;

        const button3 = new MessageActionRow().addComponents(
            new MessageButton()
.setStyle('green')
.setID("satınalım")
.setLabel('Satın Alım')
.setEmoji("961275380721913866"),

new MessageButton()
.setStyle('blurple')
.setID("destek")
.setLabel('Destek')
.setEmoji("961275359230300180"),

new MessageButton()
.setStyle('gray')
.setID("diğer")
.setLabel('Diğer')
.setEmoji("961275430655103016"))
message.channel.send(
`
**Rigel Network Destek Kanalı**

Destek sistemi üzerinden destekleri cevaplayan yetkili arkadaşlarımız vardır! Tek yapmanız gereken butona tıklayarak destek açıp hangi konuda destek almak istiyorsanız onun hakkında bir yazı hazırlayın ve gönderin. Destek Ekibimiz en yakın zamanda size geri dönüş yapacaktır. Bol şans!
`,{
    components: button3
})

    }
}