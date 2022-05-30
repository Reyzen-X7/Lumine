

// - wa connection 
const { WAConnection, MessageType, Presence, MessageOptions, Mimetype, WALocationMessage, WAMessageProto, ReconnectMode, ProxyAgent, ChatModification, GroupSettingChange, WA_MESSAGE_STUB_TYPES, WA_DEAFULT_EPHEMERAL, waChatKey, mentionedJid, processTime, prepareMessageFromContent, relayWAMessage } = require("@adiwajshing/baileys")

// - bagian modul
const qrcode = require("qrcode")
const fs = require("fs")
const ffmpeg = require('fluent-ffmpeg')
const translate = require('@vitalets/google-translate-api')
const moment = require("moment-timezone")
const { exec } = require('child_process')

// - library 
const { yta, ytv, igdl, upload, formatDate } = require('./lib/ytdl')
const simple = require('./lib/simple.js')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { addCommands, checkCommands, deleteCommands } = require('./lib/autoresp')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions.js')
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const numpang = new WAConnection()

// - database 
const commandsDB = JSON.parse(fs.readFileSync('./lib/commands.json'))
const scommand = JSON.parse(fs.readFileSync('./lib/scommand.json')) 

// - setting on or off 
autoread = true
antibule = true
mode = true
clog = true
multiprefix = true
allprefix = false 
baterai = {
battery: "" || "Tidak Terdeteksi",
isCharge: "" || false
} 
autocomposing = true 
autorecording = false 

// - setting 
const mess = JSON.parse(fs.readFileSync('./data/setting/mess.json'))
const setting = JSON.parse(fs.readFileSync("./data/setting/settings.json"))
const { ownerName, botName, ownerNumber, apiKey } = setting 

// - thumbnail 
const rey = JSON.parse(fs.readFileSync(',/data/media/rey.jpg')) 

//- ucapan waktu nya bnh
const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
        if(time2 < "23:59:00"){
        var ucapanWaktu = 'Selamat Malam 🌌'
}
        if(time2 < "19:00:00"){
        var ucapanWaktu = 'Selamat Petang 🌆'
}
        if(time2 < "18:00:00"){
        var ucapanWaktu = 'Selamat Sore 🌇'
}
        if(time2 < "15:00:00"){
        var ucapanWaktu = 'Selamat Siang 🏞'
}
        if(time2 < "11:00:00"){
        var ucapanWaktu = 'Selamat Pagi 🌅'
}
        if(time2 < "05:00:00"){
        var ucapanWaktu = 'Selamat malam 🏙'
}

//===========================================//
const addCmd = (id, command) => { const obj = { id: id, chats: command }
scommand.push(obj)
fs.writeFileSync('./lib/scommand.json', JSON.stringify(scommand))}
const getCommandPosition = (id) => { let position = null
Object.keys(scommand).forEach((i) => {
if (scommand[i].id === id) { position = i }})
if (position !== null) { return position}}
const getCmd = (id) => { let position = null
Object.keys(scommand).forEach((i) => {
if (scommand[i].id === id) { position = i }})
if (position !== null) { return scommand[position].chats } 

//===========================================//
module.exports = async (reyzzn, mek) => {
try {
  const m = await simple.smsg(reyzzn, mek)
  const antibot = m.isBaileys
  const content = JSON.stringify(m.message)
  const from = m.key.remoteJid
  const type = Object.keys(mek.message)[0]
  const time = moment.tz('Asia/Jakarta').format('ha z')
  const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(mek.message.stickerMessage.fileSha256.toString('hex')) !== null && getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) : "".slice(1).trim().split(/ +/).shift().toLowerCase()
 if (multiprefix){ var prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(cmd) ? cmd.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : '.' } else { if (allprefix){ var prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(cmd) ? cmd.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : ''}}
  const body = (type === 'listResponseMessage' && mek.message.listResponseMessage.title) ? mek.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && mek.message.buttonsResponseMessage.selectedButtonId) ? mek.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) !== null && getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) : ""

//- baterai 
reyzzn.on("CB:action,,battery", json => {
const battery = json[2][0][1].value
const persenbat = parseInt(battery)
baterai.battery = `${persenbat}%`
baterai.isCharge = json[2][0][1].live
})
	    
const budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const bb = args.join(' ')
const isCmd = body.startsWith(prefix)
const arg = budy.slice(command.length + 2, budy.length)
const q = body.slice(command.length + 1, body.length)
const totalchat = await reyzzn.chats.all(
const botNumber = reyzzn.user.jid
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? reyzzn.user.jid : isGroup ? m.participant : m.key.remoteJid
const senderNumber = sender.split("@")[0]
const groupMetadata = isGroup ? await reyzzn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupId = isGroup ? groupMetadata.jid : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender) || false
const isOwner = ownerNomor.includes(sender)
const conts = m.key.fromMe ? reyzzn.user.jid : reyzzn.contacts[sender] || { notify: jid.replace(/@.+/, '')}
const pushname = m.key.fromMe ? reyzzn.user.name : conts.notify || conts.vname || conts.name || 'pushname not detected' 
const isUrl = (url) => { return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))}
String.prototype._replaceAllString = function(s, r) {return this.split(s).join(r); }; function _filterText(str,txt,dt){if (str) {var str = str.toLowerCase(); txt = txt ? txt : "***"; dt = dt ? dt : listkata; for (var i = 0; i < dt.length; i++) {var kk = dt[i].toLowerCase(); var ii = str.search(kk); if ( ii != -1) {str = str._replaceAllString(kk,txt); } } return str; }else{ return undefined; } }
function parseMention(text = '') { return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')}

// - fake reply 
const reply = (teks) => { reyzzn.sendMessage(from, teks, text, { thumbnail: rey, sendEphemeral: true, quoted: mek, contextInfo: { forwardingScore: 508, isForwarded: true }})} 
const sendMess = (id, teks) => { reyzzn.sendMessage(id, teks, text, { contextInfo: { forwardingScore: 508, isForwarded: true }})}

// - runtime 
const runtime = function(seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor(seconds % (3600 * 24) / 3600);
var m = Math.floor(seconds % 3600 / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " hari, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " jam, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " menit, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " detik") : "";
return dDisplay + hDisplay + mDisplay + sDisplay;}
async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms));}

//- auto read 
if (autoread) {reyzzn.chatRead(from)}
if (autocomposing) {
reyzzn.updatePresence(from, Presence.composing)
}
if (autorecording) {
reyzzn.updatePresence(from, Presence.recording)
}

//- antibule 
if (antibule && isCmd && !m.sender.includes('62')) return m.reply('Sorry, this bot can only be used by *Indonesian* users')

//- gatau apaan 
function jsonformat(string) { return JSON.stringify(string, null, 2)}

//- calendwr 
let d = new Date
let locale = 'en'
const calender = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })

// - get thumbnail pp orang 
try { pporang = await reyzzn.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)} catch { pporang = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'}
const ppu = await getBuffer(pporang)

//- ya gitu 
const isImage = (type === 'imageMessage')
const isVideo = (type === 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedMsg = type === 'extendedTextMessage' && content.includes('Message')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isButton = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : ''
const isList = (type == 'listResponseMessage') ? mek.message.listResponseMessage.title : ''

//- button list message 
const sendListMessage = (id, text1, desc1, sec  = [], options = {}) => {
const listMessages = { buttonText: text1, description: desc1, sections: sec, listType: 1 }
reyzzn.sendMessage(id, listMessages, MessageType.listMessage, options)}

//- button message 
const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
const buttonMessages = { contentText: text1, footerText: desc1, buttons: but, headerType: "EMPTY" }
reyzzn.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)}

//- button document  
const sendButDocument = async(id, text1, desc1, media, doc1, but = [], options = {}) => {
kma = doc1
mhan = await reyzzn.prepareMessage(from, media, document, kma)
const buttonMessages = { documentMessage: mhan.message.documentMessage,contentText: text1,footerText: desc1,buttons: but,headerType: "DOCUMENT"}
reyzzn.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)}
     
//- button image   
const sendButImage = async(id, text1, desc1, gam1, but = [], options = {}) => {
kma = gam1
mhan = await reyzzn.prepareMessage(from, kma, image)
const buttonMessages = {imageMessage: mhan.message.imageMessage,contentText: text1,footerText: desc1,buttons: but,headerType: "IMAGE"}
reyzzn.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)}

//- button video 
const sendButVideo = async(id, text1, desc1, vid1, but = [], options = {}) => {
kma = vid1
mhan = await reyzzn.prepareMessage(from, kma, video)
const buttonMessages = {videoMessage: mhan.message.videoMessage,contentText: text1,footerText: desc1,buttons: but,headerType: "VIDEO"}
reyzzn.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)}
        
//- button lokasi 
const sendButLocation = async (id, text1, desc1, loc1, but = [], options = {}) => {
kma = loc1
mhan = await reyzzn.prepareMessage(from, kma, location)
const buttonMessages = { locationMessage: mhan.message.locationMessage,contentText: text1,footerText: desc1,buttons: but,headerType: "LOCATION"}
reyzzn.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)}

//- fake catalog 
const fmen = {
	key : {
participant : '0@s.whatsapp.net'
},
message: {
orderMessage: {
itemCount : 2022,
status: 1,
surface : 1,
message: `Developed by Reyzen X-671`, //Kasih namalu
thumbnail: fs.readFileSync('./data/media/rey.jpg'), //Gambarnye
sellerJid: '0@s.whatsapp.net' 
}
}
}
                      
//- auto respon 
if (!mek.key.fromMe) {
if (listkata.includes(cmd)){reply('عَنْ أَبِي الدَّرْدَاءِ، أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: إِنَّ اللَّهَ لَيُبْغِضُ الفَاحِشَ البَذِيءَ\n\nDari Abu Ad-Darda’ radhiallahu ‘anhu bahwasanya Rasulullah ﷺ bersabda, “Sungguh Allah benci dengan orang yang lisannya kotor dan kasar.”')}
if (['Ceoo','ceoo','Ceo','ceo','Ceeo','ceeo'].includes(cmd)){m.reply(`Halo kak ${pushname} ada yang bisa ${cmd} bantu? >-<`)}}

//- stop numpang 
if(isButton == 'dclearchat'){ if (isGroup) return reply(mess.OnlyPM)
sendMess(from, `selamat tinggal, jika ingin menggunakan bot ini kembali silahkan klik wa.me/${reyzzn.user.jid}`)
await sleep(3000)
reyzzn.modifyChat(from, "delete")}
if(isButton == 'dstopjadibot'){
numpang.close()}

//- auto kick
if (budy.startsWith(`!-`)){
if (!mek.key.fromMe && !isOwner) return
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Reply targetnya!')
kick = mek.message.extendedTextMessage.contextInfo.participant
reyzzn.groupRemove(from, [kick])}
		
//- auto add  group 
if (budy.startsWith(`!+`)){
if (!mek.key.fromMe && !isOwner) return
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Reply targetnya!')
add = mek.message.extendedTextMessage.contextInfo.participant
reyzzn.groupAdd(from, [add])}

//- eval 
if (budy.startsWith(`$`)){ 
if (!isOwner && !mek.key.fromMe) return
const sep = budy.split("\n")
let exc = budy.replace(sep[0]+"\n", "")
exec(exc, (err, stdout, stderr) => {
if (stdout) return reply(`${stdout}`)
if (stderr) return reply(`${stderr}`)
if (err) return reply(`${err}`)})}
	    
if (/^=?>/.test(budy) && (isOwner || mek.key.fromMe)){ let parse = /^=>/.test(budy) ? budy.replace(/^=>/,'return') : budy.replace(/^>/,'')
try{ let evaluate = await eval(`;(async () => {${parse} })()`).catch(e => { return e })
return reply(require('util').format(evaluate))} catch(e){
return reply(require('util').format(e))}}

if (!mode) { if (!isOwner && !mek.key.fromMe) return } 

switch (command) { 

//- menu nya 
  case 'menu': 
dtod = "6283148375193@s.whatsapp.net"
otod = `${ownerNumber}@s.whatsapp.net`
stod = `${sender}`
runtime = process.uptime()
  ubio = await reyzzn.getStatus(`${sender.split('@')[0]}@c.us`)
  ubio = ubio.status == 401 ? 'Hey there! I am using WhatsApp.' : ubio.status 
  menu = `❏「 \`\`\`${botName}\`\`\` 」

╾ _Creator : @${dtod.split('@')[0]}_
╾ _Battery : ${baterai.battery}_
╾ _Mode : ${mode ? 'Public' : 'Self'}_
╾ _Runtime : ${runtime(runtime)}_
╾ _Total chat : ${totalchat.length}_

❏「 \`\`\`INFO BOT\`\`\` 」

╾ _Nama Bot : ${botName}_
╾ _Nama Owner : ${ownerName}_
╾ _Nomor Owner : @${otod.split('@')[0]}_
╾ _Auto Composing : ${autocomposing}_
╾ _Auto Recording : ${autorecording}_

❏「 \`\`\`INFO USER\`\`\` 」

╾ _Status : ${isOwner ? 'Owner' : 'User'}_
╾ _Nama : ${pushname}_
╾ _Bio : ${ubio}_
╾ _Nomor : @${stod.split('@')[0]}_`
sendButDocument(from, `${menu}`, "*_© Reyzen X-671_*", fs.readFileSync('./data/rey'), {mimetype:Mimetype.pdf, thumbnail:fs.readFileSync('./data/media/thumb.jpg'), filename:`${calender} - ${time}`}, [{buttonId:`command`,buttonText:{displayText:'LIST MENU'},type:1},{buttonId:`owner`,buttonText:{displayText:'DEVELOPER'},type:1},{buttonId:`listsewa`,buttonText:{displayText:'SEWA BOT'},type:1}], {quoted:fmen, contextInfo: { mentionedJid: [dtod,otod,stod,ubio], forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${ucapanWaktu} ${pushname}`,body:`click here to play music`,mediaType:"2",thumbnail:ppu,mediaUrl:`belum ada`}}})
break

//- menu downloader 
case 'play':
if (args.length < 1) return reply(`Kirim perintah *${prefix}play query`)
ya = ` ```${botName}```
*• req dari :* _${pushname}_
*• command :* _${cmd}_ 
*• date :* _${calender - time}_

*_created by ${ownerName}_* ~`
sendButMessage(from, `${ya}`, "_klik report jika bot tidak merespon_", [{buttonId:`report ${cmd}`,buttonText:{displayText:"REPORT"},type:1}], {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
let yut = await yts(v)
yta(yut.videos[0].url)             
.then(async(res) => {
var { thumb, title, filesizeF, filesize } = res
var capti = `𝗬𝗢𝗨𝗧𝗨𝗕𝗘 𝗣𝗟𝗔𝗬🍁\n•💬 Judul : ${yut.all[0].title}\n•🎥 ID Video : ${yut.all[0].videoId}\n•⏰️ Diupload Pada : ${yut.all[0].ago}\n•👁️️ Views : ${yut.all[0].views}\n•▶️ Durasi : ${yut.all[0].timestamp}\n•📍 Channel : ${yut.all[0].author.name}\n•🔗 Link Channel : ${yut.all[0].author.url}\n•⚡ Link Video : ${yut.videos[0].url}`
ya = await getBuffer(thumb)
py =await zee.prepareMessage(from, ya, image)
sendButloc(from,monospace(capti),'',`*select the type you want to download*`,[{buttonId: `${prefix}ytmp3 ${yut.all[0].url}`, buttonText: {displayText: 'AUDIO'}, type: 1},
{buttonId: `${prefix}ytmp4 ${yut.all[0].url}`, buttonText: {displayText: 'VIDEO'}, type: 1}],null,null,ya)
})
          break      
    
default:

if (clog) {console.log(mek)}}} catch (e) { e = String(e)
if (!e.includes("jid is not defined")) { if (!e.includes("this.isZero")) { if (clog) {console.log(`\x1b[31m${e}\x1b[0m`)}}}}}
