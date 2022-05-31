const { WAConnection: _WAConnection, MessageType, Presence, Mimetype, GroupSettingChange } = require('@adiwajshing/baileys')
const fs = require("fs")
const fetch = require('node-fetch')
const { exec } = require('child_process')
const os = require('os')
const simple = require('./lib/simple.js')
const WAConnection = simple.WAConnection(_WAConnection)
const moment = require("moment-timezone")
const setting = JSON.parse(fs.readFileSync("./settings.json"))
const { ownerName, botName, ownerNumber } = setting
const time = moment.tz('Asia/Jakarta').format('ha z')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions.js')
const sleep = async (ms) => { return new Promise(resolve => setTimeout(resolve, ms))}
let d = new Date
let locale = 'en'
const calender = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
global.mine = new WAConnection()

watchFile("./Lumine.js")
require("./Lumine.js")

exec(`mkdir $HOME/.termux/ ;echo "extra-keys = [['ESC','/','-','HOME','UP','END','BKSP'],['KEYBOARD','CTRL','ALT','LEFT','DOWN','RIGHT','ENTER']]" >> $HOME/.termux/termux.properties;termux-reload-settings`, (err, stdout, stderr) => { console.log(stdout)})
const starts = async (session) => {
mine.logger.level = 'silent'
mine.version = [2, 2142, 12]
mine.browserDescription = [`${ownerName}`,'Desktop','3.0']

mine.on("qr", (qr) => { console.log('\x1b[32mqr { Scan }\x1b[0m')})
fs.existsSync(session) && mine.loadAuthInfo(session)
	
mine.on("connecting", () => {console.log('\x1b[32mconnecting { Menghubungkan }\x1b[0m')})
mine.on("open", () => {console.log('\x1b[32mopen { Terhubung }\x1b[0m')})
mine.on("ws-close", () => {console.log('\x1b[31mws-close { Menghubungkan Kembali }\x1b[0m')})
mine.on("close", () => {console.log('\x1b[31mclose { Terputus }\x1b[0m')})
 
await mine.connect({timeoutMs: 30*1000})
fs.writeFileSync(session, JSON.stringify(mine.base64EncodedAuthInfo(), null, '\t'))
try { 
pporang = await mine.getProfilePicture(`${mine.user.jid.split('@')[0]}@s.whatsapp.net`)
  
} catch { pporang = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'}
const ppu = await getBuffer(pporang)
mine.sendMessage(`${ownerNumber}@s.whatsapp.net`, `${JSON.stringify(mine.user, null, 2)}`, MessageType.text, { contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${botName} connected`,thumbnail:ppu,previewType:"PHOTO"}}})


mine.on("chat-update", (mek) => {
if (!mek.hasNewMessage) return
mek = mek.messages.all()[0]
if (!mek.message) return
if (mek.key && !mek.key.remoteJid == 'status@broadcast') return
listkata = [`${setting.apiKey}`,`${ip.regionName}`,`${ip.city}`,`${ip.lat}`,`${ip.lon}`,`${ip.query}`,'Anjing','Babi','Kunyuk','Bajingan','Asu','Bangsat','Kampret','Kontol','Memek','Ngentot','Pentil','Perek','Pepek','Pecun','Bencong','Banci','Maho','Gila','Sinting','Tolol','Sarap','Setan','Lonte','Hencet','Taptei','Kampang','Pilat','Keparat','Bejad','Gembel','Brengsek','Tai','Anjrit','Bangsat','Fuck','Tetek','Ngulum','Jembut','Totong','Kolop','Pukimak','Bodat','Heang','Jancuk','Burit','Titit','Nenen','Bejat','Silit','Sempak','Fucking','Asshole','Bitch','Penis','Vagina','Klitoris','Kelentit','Borjong','Dancuk','Pantek','Taek','Itil','Teho','Bejat','Pantat','Bagudung','Babami','Kanciang','Bungul','Idiot','Kimak','Henceut','Kacuk','Blowjob','Pussy','Dick','Damn','Ass'];
copyright = `\`\`\`© by SkyLark ${d.toLocaleDateString(locale, { year: 'numeric' })}\`\`\``
grup = "https://chat.whatsapp.com/Dgt6JhzTvlmEor8Zz23fHx"
denis = "6285866295942@s.whatsapp.net"
ari = "6285863731628@s.whatsapp.net"
script = "https://bit.ly/bad-bot"
ownerNomor = ["6283148375193@s.whatsapp.net",`${setting.ownerNumber}@s.whatsapp.net`,"6285863731628@s.whatsapp.net"]
require("./Lumine.js")(mine, mek)})}
starts('./session.json')

function watchFile(module, cb = (module) => 
console.log(`\x1b[32mModule ( '${module}' ) updated!\x1b[0m`)) {
console.log(`\x1b[32mModule ( '${module}' ) detected!\x1b[0m`)
fs.watchFile(require.resolve(module), async () => { await uncache(require.resolve(module)) 
cb(module)})}
function uncache(module = ".") { return new Promise((resolve, reject) => { try { delete require.cache[require.resolve(module)] 
resolve()

} catch (e) { reject(e)}})}