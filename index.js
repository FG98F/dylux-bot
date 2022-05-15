
//todas las funciones se han simplificado lo más posible 

// conectando a WhatsApp web usando Baileys https://www.github.com/adiwajshing/baileys
const {
  MessageType,
  Mimetype,
  GroupSettingChange,
  mentionedJid
} = require("@adiwajshing/baileys");

// functions node modules
const speed = require('performance-now');
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require("child_process");
let path = require('path');
const translate = require('@iamtraction/google-translate');
const ffmpeg = require("fluent-ffmpeg");
const toMs = require('ms');
const fs = require("fs");
const similarity = require('similarity');
const threshold = 0.72;
const fetch = require('node-fetch');
const fgx = require('./result/index');
const package = require('./package.json');
const yts = require('yt-search');
const gls = require('google-it');
const FormData = require('form-data');
const axios = require("axios");
//-- library
const simple = require('./whatsapp/connecting');
const { fetchJson, fakeText, getBuffer } = require('./library/fetcher');
const { color, bgcolor } = require('./library/color');
const { 
  createExif,
  modStick,
  h2k, 
  isUrl,
  isLinkyt,
  pickRandom,
  generateMessageID, 
  getGroupAdmins,
  getRandom,
  kyun,
  weton,
  week,
  date,
  waktu,
  tanggal,
  time,
  WIB,
  WITA,
  WIT,
  formatDate
} = require('./library/functions');

// functions

const {
  direc,
  addImage,
  addVideo,
  addStiker,
  addAudio,
  addReport
} = require('./functions/directory');


const { 
  User, 
  cekRegis,
  addRegister,
  addUser, 
  cekUser,
  cekPoin, 
  addPoin, 
  delPoin, 
  addLevel,
  cekLevel,
  cekBanned, 
  addBanned, 
  delBanned,
  cekPremium,
  addPremium,
  delPremium,
  addChatbot,
  delChatbot,
  cekChatbot,
  cekVoiceCommand,
  addVoiceCommand,
  delVoiceCommand,
  addAfk,
  delAfk,
  cekAfk,
  cekAfkReason,
  cekAfkTime,
  addWarn,
  delWarn,
  cekWarn,
  addBahasa,
  cekBahasa
} = require('./functions/user'); 

const {
  Group,
  addGroup,
  addOffline,
  delOffline,
  cekOffline,
  addWelcome,
  delWelcome,
  cekWelcome,
  addAntilink,
  delAntilink,
  cekAntilink,
  addBadword,
  delBadword,
  cekBadword,
  addAntidelete,
  delAntidelete,
  cekAntidelete,
  addDetect,
  delDetect,
  cekDetect,
  addViewonce,
  delViewonce,
  cekViewonce
} = require('./functions/group'); 

const {
  st,
  addName,
  addAuthor,
  addPackname,
  addWm,
  addgameTime,
  addPoingame,
  addCmd
} = require('./functions/setting-bot'); 

const {
  Wel,
  addCustomWelcome,
  getCustomWelcome,
  setCustomWelcome,
  delCustomWelcome,
  getCustomBye,
  setCustomBye,
  delCustomBye
} = require('./functions/welcome');

const { msgFilter } = require('./functions/antispam')
const { menu, menuVC } = require('./functions/menu'); 
const { espa, ind, eng, port } = require('./language/index');

// funciones de  ./functions/setting-bot
let ownerNumber = st.ownerNumber;
let isPoingame = st.poinGame; 
let isgameTime = st.gameTime;
let isPoinawal = st.poinAwal;
let isNama = st.nama; 
let isAuthor = st.author; 
let isPackname = st.packname;
let isWm = st.wm;
let isTotalcmd = st.totalcommand;
let hujanapi = st.hujanApi;
let linkIg = st.linkIg;
// -- thumbnail
let thumbfg = fs.readFileSync('./temp/fg.jpg'); 

let fakethumb = fs.readFileSync('./temp/fake.jpg'); 

let baterai = {
    baterai: 0,
    cas: false
};

let Use = {
  prefix: '/',
  multi: true,
  nopref: false,
  onepref: false
};

module.exports = Fg = async (Fg, mek) => {
  try {
    if (!mek.hasNewMessage) return;
    mek = mek.messages.all()[0];
    if (!mek.message) return;
    //--Bot self
    if(mek.key.fromMe) return; /// Eliminalo para que el Bot sea self, puede tener problemas con los juegos
    if (mek.key && mek.key.remoteJid == 'status@broadcast') return;
    mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
    let m = simple.smsg(Fg, mek);
    global.prefix;
    global.blocked;
    const content = JSON.stringify(mek.message);
    const from = mek.key.remoteJid;
    const type = Object.keys(mek.message)[0];
    const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType;
    const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = Fg.user.phone;
//--
    const cmd = 
    type === 'conversation' && mek.message.conversation ? mek.message.conversation :
    type === 'imageMessage' && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : 
    type === 'videoMessage' && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : 
    type === 'extendedTextMessage' && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : 
    type === 'listResponseMessage' && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId :
    type === 'buttonsResponseMessage' && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''.slice(1).trim().split(/ +/).shift().toLowerCase();

      if(Use.multi){
        var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#%^&./\\©^]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™✓=|~xzZ+×_*!#,|÷?;:%^&./\\©^]/gi) : '-';
      } else if (Use.nopref) {
        prefix = '';
      } else if (Use.onepref) {
        prefix = Use.prefix;
        }

     const body = 
    type === 'conversation' && mek.message.conversation.startsWith(prefix) ? mek.message.conversation : 
    type === 'imageMessage' && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : 
    type === 'videoMessage' && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : 
    type === 'extendedTextMessage' && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : 
    type === 'listResponseMessage' && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId :
    type === 'buttonsResponseMessage' && mek.message[type].selectedButtonId.startsWith(prefix) ? mek.message[type].selectedButtonId : ''
     
     const budy = 
     type === 'conversation' ? mek.message.conversation : 
     type === 'extendedTextMessage' ? mek.message.extendedTextMessage.text :
     type === 'imageMessage' ? mek.message.imageMessage.caption : 
     type === 'videoMessage' ? mek.message.videoMessage.caption : 
     type === 'stickerMessage' ? 'Sticker' :
     type === 'audioMessage' ? 'Audio' : '';
     const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
     const args = body.trim().split(/ +/).slice(1);
     const more = String.fromCharCode(8206);
     const readMore = more.repeat(4000);
     const value = args.join(' ');
     const isCmd = body.startsWith(prefix);
     const totalchat = await Fg.chats.all();
     const botNumber = Fg.user.jid;
     
//-- Group Metadata
     const isGroup = from.endsWith('@g.us');
     const sender = isGroup ? mek.participant : mek.key.remoteJid;
     const groupMetadata = isGroup ? await Fg.groupMetadata(from) : '';
     const groupName = isGroup ? groupMetadata.subject : '';
     const groupDesc = isGroup ? groupMetadata.desc : ''
     const groupId = isGroup ? groupMetadata.jid : '';
     const groupMembers = isGroup ? groupMetadata.participants : '';
     const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : '';
     const isBot = mek.key.fromMe ? true : false
     const isOwner = ownerNumber.includes(sender) || false;
     const isBotAdmins = groupAdmins.includes(botNumber) || false;
     const isAdmins = groupAdmins.includes(sender) || false;
     let who = mek.quoted ? mek.quoted.sender : mek.mentionedJid && mek.mentionedJid[0] ? mek.mentionedJid[0] : mek.fromMe ? Fg.user.jid : mek.sender;
     let dia = mek.quoted ? mek.quoted.sender : mek.mentionedJid && mek.mentionedJid[0] ? mek.mentionedJid[0] : false;
     const pushname = Fg.getName(who);
     const about = (await Fg.getStatus(who).catch(console.error) || {}).status || ''
    

//--- comprobar la información del usuario
     let isPoin = cekPoin(sender);
     let isLevel = cekLevel(sender);
     let isPremium = cekPremium(sender);
     let isChatbot = cekChatbot(sender);
     let isVoiceCommand = cekVoiceCommand(sender);
     let isBanned = cekBanned(sender);
     let isAfk = cekAfk(sender);
     let isAfkTime = cekAfkTime(sender);
     let isAfkReason = cekAfkReason(sender);
     let isOffline = cekOffline(from);
     let isWelcome = cekWelcome(from);
     let isAntidelete = cekAntidelete(from);
     let isAntilink = cekAntilink(from);
     let isDetect = cekDetect(from);
     let isRegister = cekRegis(sender);
     let isViewonce = cekViewonce(from);
     let msg = cekBahasa(sender);
     
         // -- Idioma 
     if (msg === "es") {
       msg = espa;
     } else if (msg === "en") {
       msg = eng;
     } else if (msg === "id") {
       msg = ind;
     } else if (msg === "pt") {
       msg = port;
     } else {
       msg = espa;
     }
     
     //--- Decir la hora según la zona horaria 
     
     //const time2 = moment().tz("America/La_Paz").format("HH:mm:ss");
     
     if (time < "24:59:00") {
       ucapanWaktu = msg.night;
     }
     if (time < "18:00:00") {
       ucapanWaktu = msg.evening;
     }
     if (time < "15:00:00") {
       ucapanWaktu = msg.day;
     }
     if (time < "11:00:00") {
       ucapanWaktu = msg.morning;
     }
     if (time < "05:00:00") {
       ucapanWaktu = msg.night;
     }
     
 //-- prefijo
     if (Use.multi) {
        modepref = 'Multi Prefix'
      } else if (Use.nopref) {
        modepref = 'No Prefix'
      } else if (Use.onepref) {
        modepref = `*${Use.prefix}*`
      }
     
     // funciones de mención de usuario premium
     if (isPremium) {
       prem = "Si";
     } else {
       prem = "No";
     }
     
// -- bateria
Fg.on('CB:action,,battery', json => {
	const a = json[2][0][1].value;
	const b = json[2][0][1].live;
	baterai.baterai = a;
	baterai.cas = b;
});
     
// detected quoted 
     const isMedia = type === "imageMessage" || type === "videoMessage";
     const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage');
 	const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage');
     const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage');
     const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage');
	 const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage');
	 const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage');
	 const isQuotedextendedText = type === 'extendedTextMessage' && content.includes('extendedTextMessage');
	
	//---
      const sendFileFromUrl = async(link, type, options) => {
      hasil = await getBuffer(link)
      Fg.sendMessage(from, hasil, type, options).catch(e => { fetch(link).then((hasil) => { Fg.sendMessage(from, hasil, type, options).catch(e => { Fg.sendMessage(from, { url : link }, type, options).catch(e => {
      m.reply('⚠️ Error')
      })})})})}

// comando de registro de la consola cuando está en un chat privado
    if (!isGroup && isCmd) {
      console.log("‣", bgcolor('Cmd en CHAT PRIVADO', 'magenta'));
      console.log(" De :", color(pushname, "yellow"), "Fecha :", bgcolor(tanggal, 'grey'));
      console.log(" Cmd :", color(command.toUpperCase(), "orange"), "MessageType :", bgcolor(type, "orange"));
    }
    
// comando de registro de la consola cuando está en el grupo
    if (isGroup && isCmd) {
      console.log("‣", bgcolor('Cmd en', 'magenta'), "Grupo", color(groupName, "aqua"));
      console.log(" De:", color(pushname, "yellow"), "Fecha :", bgcolor(tanggal, 'grey'));
      console.log(" Cmd :", color(command.toUpperCase(), "blue"), "MessageType :", bgcolor(type, "orange"));
    }
  
// mensaje de registro de la consola sin comando
    if (!isCmd && !mek.key.fromMe && !mek.isBaileys) {
      console.log("‣", bgcolor('Message','magenta'));
      console.log(" De :", color(pushname, "yellow"), "Fecha :", bgcolor(tanggal, 'grey'));
      console.log(" Mensaje :", color(budy, "orange"), "MessageType :", bgcolor(type, "orange"));
    }
    
/**
// Anti spam que se suma al spam :v
    if (isCmd && msgFilter.isFiltered(from)) {
         return m.reply('⚠️ Espera 2 segundos antes de usar otro comando')
					}
    if (isCmd && !isOwner && !isBot) msgFilter.addFilter(from)
*/

 let infoMSG = JSON.parse(fs.readFileSync('./database/msg.data.json'))
    infoMSG.push(JSON.parse(JSON.stringify(mek)))
    fs.writeFileSync('./database/msg.data.json', JSON.stringify(infoMSG, null, 2))
    const urutan_pesan = infoMSG.length
    if (urutan_pesan === 5000) {
    infoMSG.splice(0, 4300)
    fs.writeFileSync('./database/msg.data.json', JSON.stringify(infoMSG, null, 2))
    }


// auto respon
/*Dbot = ['@'+Fg.user.jid.split('@')[0]]
for ( var L of Dbot){
  if(!mek.isBaileys && budy.match(L)){
   capt = 'Hola @'+sender.split('@')[0]+' Aquí estoy necesitas ayuda? '
   return Fg.send2ButtonLoc(from, thumbfg, capt, 'Opciones ', '⦙☰ Menu', prefix + 'menu', '⏍ Info', prefix + 'info', false, {
          contextInfo: {
            mentionedJid: Fg.parseMention(capt),
          },
        });
  }
}*/

if (budy) addUser(sender); 
if (isGroup && budy) addGroup(from); 
if (isCmd) addCmd() 
if (isCmd) addPoin(sender); 
if (isGroup && budy) addCustomWelcome(from) 
if(isGroup && budy && isAfk){ 
  await delAfk(sender)
 return m.reply(msg.offAfk)
}


// suma puntos al nivel y acumula para subir de nivel
const Amount = isPoinawal * (Math.pow(2, isLevel) - 1)
if (Amount <= isPoin) {
           await addLevel(sender) 
          }

// comando especial cuando el estado fuera de línea  está activado en el grupo
switch (command) {
  
  case 'banchat': // escribe  banchat el bot no responderá a ningún comando en ciertos grupos
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner && !isBot) return m.reply(msg.admin)
    if (isOffline === true ) {
      return m.reply('✅ Bot offline')
    }
    await addOffline(from)
    m.reply(msg.offline)
    break

  case 'unbanchat':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner && !isBot) return m.reply(msg.admin)
    if (isOffline === false ) {
      return m.reply('✅ Bot online')
    }
    await delOffline(from)
    m.reply(msg.online)
    break 
    default:
}


if (isGroup && isOffline === true) return; 
if (isBanned) return; // los usuarios con estado baneado no podrán usar el comando

switch (command) { 
 
 case 'menu': 
 case 'help':
    capt = `────  *DyLux  ┃ ᴮᴼᵀ*  ────
    
${msg.hi} *${pushname}* ${ucapanWaktu}
    
⎔ *${msg.lvl}* : ${isLevel}
⎔ *Premium* : ${prem}

▢ ${msg.cretb}
• https://youtu.be/F4lGWb1WXgM 

${readMore}
${menu(prefix)} 
`
    Fg.send3ButtonLoc(from, thumbfg, capt, `▢ *DyLux  ┃ ᴮᴼᵀ*\n▢ *Total Hits* : ${isTotalcmd}\n▢ *Usuarios* : ${User.length}\n▢ *Runtime* : ${kyun(process.uptime())}\n\n${msg.foll}`,  '✆ Owner', `${prefix}owner`, '⏍ Info', `${prefix}info`, `⌬ ${msg.gp}s`, `${prefix}grupos`)
    break
    
   /*case 'menuvc': 
 case 'helpvc':
    capt = `────  *DyLux  ┃ ᴮᴼᵀ*  ────
    
${msg.hi} *${pushname}* ${ucapanWaktu}
    
⎔ *${msg.lvl}* : ${isLevel}
⎔ *Premium* : ${prem}
${readMore}
*VOICE COMMAND* ${msg.vnCmd(prefix)} 
${menuVC} 
`
    Fg.send3ButtonLoc(from, thumbfg, capt, `▢ *DyLux  ┃ ᴮᴼᵀ*\n▢ *Total Hits* : ${isTotalcmd}\n▢ *Usuarios* : ${User.length}\n▢ *Runtime* : ${kyun(process.uptime())}\n\n${msg.foll}`, '✆ Owner', `${prefix}owner`, '⏍ Info', `${prefix}info`, `⌬ ${msg.gp}s`, `${prefix}grupos`)
    break*/
    
    case 'grupos': 
    case 'groups': 
    case 'Darflame_GT': 
    gps = `
≡  *DyLux  ┃ ᴮᴼᵀ*  GRUPOS

▢ ${msg.gp} 1


▢ *YouTube*

`
m.reply(gps)
break 

case 'donate':
case 'donar':
 m.reply(msg.donate) 
break
 
  case 'ping':
    const timestamp = speed();
    const latensi = speed() - timestamp 
    m.reply(`🟢 *${msg.pinsp}* : ${latensi.toFixed(3)} _${msg.pinse}_`)
  break 
  
  case 'idioma':
case 'bahasa':
case 'language':
case 'lenguaje':
case 'lang':
    if(!value) return m.reply(msg.Pbahasa)
    if (value.toLowerCase() === "es") {
      await addBahasa(sender, "es")
      m.reply("✅ Español Seleccionado\nAhora el bot responderá a su mensaje en Español")
    } else if (value.toLowerCase() === "id") {
      await addBahasa(sender, "id")
      m.reply("✅ Bahasa Indonesia terpilih\nSekarang bot akan membalas pesanmu dengan bahasa Indonesia")
    } else if (value.toLowerCase() === "en") {
      await addBahasa(sender, "en")
      m.reply("✅ Selected English\nNow the bot will reply to your message in English")
     } else if (value.toLowerCase() === "pt") {
      await addBahasa(sender, "pt")
      m.reply("✅ Português selecionados\nAgora o bot vai responder a sua mensagem em Português")
    } else {
      m.reply(msg.nobahasa)
    }
    break; 
    
    case 'owner':
case 'creator':
case 'creador': 
case 'developer':
   //Fg.sendContact(from, '5493885839638', 'FG98', mek) 
   m.reply(`
*≡ OWNER*

▢ Instagram :
 
▢ WhatsApp : 
 
▢ Facebook : 

▢ YouTube : 
`)
    break
    
    case 'info':
   const unread = await Fg.loadAllUnreadMessages ();
   i = []
   giid = []
				for (mem of totalchat){
					i.push(mem.jid)
				}
				for (id of i){
					if (id && id.includes('g.us')){
						giid.push(id)
					}
				}
   uptime = process.uptime()
   teks = `≡  *INFO BOT*
   
   *ESTADO*
▢ Contactos : ${Object.keys(Fg.contacts).length}
▢ Total Chats : *${totalchat.length}* 
▢ *${totalchat.length - giid.length}* Chats privados
▢ *${giid.length}* Chats de grupo
▢ *${unread.length}* Mensaje no leídos


*≡ DISPOSITIVO*

▢ Versi Wa : ${Fg.user.phone.wa_version}

*≡ OWNER*
▢ Instagram : 
▢ WhatsApp : 

*≡ SCRIPT*
▢ Git : ${package.homepage} 
` 
Fg.send2Button(from, teks, '*_© FG98 DyLux_*', `ꨄ︎ Apoyar`, `${prefix}donate`, `⌬ ${msg.gp}s`, `${prefix}grupos`)
   break
   
    case 'nameninja':
 case 'blackpill':
 case 'typewriter':
 case 'sans':
 case 'castle':
 if(!value) return m.reply(msg.notext)
  if(command === "nameninja" ) {
      hasil = await fgx.namaninja(value)
  } else if(command === "blackpill"){
    hasil = await fgx.blackpill(value)
  } else if(command === "typewriter"){
    hasil = await fgx.typewriter(value)
   } else if(command === "sans"){
    hasil = await fgx.sans(value)
  } else if(command === "castle"){
    hasil = await fgx.castle(value)
  }
   m.reply(hasil)
   break
   
   case 'verdad':
  case 'reto':
    if(command === "verdad" ) {
      hasil = fgx.verdad()
    } else if (command === "reto" ) {
      hasil = fgx.reto()
      }
    capt = `‣ *${command.toUpperCase()}* \n\n${hasil}`
    Fg.send2Button(from, capt, `▢ ${msg.foll}`, `VERDAD`, `${prefix}verdad`, `RETO`, `${prefix}reto`)
    break
    
    case 'fake':
    case 'fitnah':
    if(!value) return m.reply(msg.notext)
    if(!dia) return m.reply(msg.notag)
    text1 = value.split("|")[0]
    text2 = value.split("|")[2]
    Fg.fakeReply(from, text1, dia, text2, from)
    break
  
case 'pregunta':
case 'preg':
if(!value) return m.reply(`📌 *${msg.exple} :*\n *${prefix + command}* ${msg.pregt}`)
prefg = await fetchJson(`https://api-sv2.simsimi.net/v2/?text=${value}&lc=${cekBahasa(who)}`, {method: 'get'})
 m.reply(`≡ *PREGUNTAS*
 
▢ *Pregunta:* ${value}
▢ *Respuesta :* ${prefg.success.replace('simsimi', 'DyLux').replace('Simsimi', 'DyLux').replace('sim simi', 'DyLux')}`) 
break 

case 'afk':
   if(!isGroup) return m.reply(msg.group)
   tgl = week + ", " + time
   reason = value ? msg.with + value : ''
   if(args.length > 10) return m.reply('No')
   await addAfk(sender, tgl, reason)
   m.reply(msg.onAfk(reason))
 break

case "s":
  case "stiker":
  case "sticker":
    anu = args.join(" ").split("|");
        a = anu[0] !== "" ? anu[0] : isAuthor;
        b = typeof anu[1] !== "undefined" ? anu[1] : isPackname;
    if ( 
      ((isMedia && !mek.message.videoMessage) || isQuotedImage)
      ) { 
        const encmedia = isQuotedImage 
        ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message .extendedTextMessage.contextInfo : mek;
          media = await Fg.downloadAndSaveMediaMessage(encmedia); 
          await createExif(a, b); 
          out = getRandom(".webp"); 
          ffmpeg(media) 
          .on("error", (e) => { 
            console.log(e); 
            Fg.sendMessage(from, "⚠️ Error", "conversation", { quoted: mek }); 
            fs.unlinkSync(media); 
            })
            .on("end", () => { 
              _out = getRandom(".webp"); 
              spawn("webpmux", [
                "-set",
                "exif",
                "./temp/data.exif",
                out,
                "-o",
                _out,
              ]).on("exit", () => {
                Fg.sendMessage(
                  from,
                  fs.readFileSync(_out),
                  "stickerMessage",
                  { quoted: mek }
                );
                fs.unlinkSync(out);
                fs.unlinkSync(_out);
                fs.unlinkSync(media);
              });
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(out);
        } else if (
          ((isMedia && mek.message.videoMessage.seconds < 11) ||
            (isQuotedVideo &&
              mek.message.extendedTextMessage.contextInfo.quotedMessage
                .videoMessage.seconds < 11))
        ) {
          const encmedia = isQuotedVideo
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          const media = await Fg.downloadAndSaveMediaMessage(encmedia);
          await createExif(a, b);
          out = getRandom(".webp");
          ffmpeg(media)
            .on("error", (e) => {
              console.log(e);
              Fg.sendMessage(from, "⚠️ Error", "conversation", {
                quoted: mek,
              });
              fs.unlinkSync(media);
            })
            .on("end", () => {
              _out = getRandom(".webp");
              spawn("webpmux", [
                "-set",
                "exif",
                "./temp/data.exif",
                out,
                "-o",
                _out,
              ]).on("exit", () => {
                Fg.sendMessage(
                  from,
                  fs.readFileSync(_out),
                  "stickerMessage",
                  { quoted: mek }
                );
                fs.unlinkSync(out);
                fs.unlinkSync(_out);
                fs.unlinkSync(media);
              });
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(out);
        } else {
          m.reply(msg.stima);
        }
        break

  case "take":
  case "robar":
      if (!isQuotedSticker) return m.reply(msg.replyStic);
      encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m"))
        .message.extendedTextMessage.contextInfo;
      media = await Fg.downloadAndSaveMediaMessage(encmedia);
        anu = args.join(" ").split("|");
        a = anu[0] !== "" ? anu[0] : isAuthor;
        b = typeof anu[1] !== "undefined" ? anu[1] : isPackname;
        createExif(a, b);
        modStick(media, Fg, mek, from);
        break 
   
  case "toimg":
    if (!isQuotedSticker) return m.reply(msg.replyStic);
        m.reply(msg.wait);
        encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m"))
          .message.extendedTextMessage.contextInfo;
        media = await Fg.downloadAndSaveMediaMessage(encmedia);
        ran = getRandom(".png");
        exec(`ffmpeg -i ${media} ${ran}`, (err) => {
          fs.unlinkSync(media);
          if (err) return m.reply("⚠️ Error");
          buffer = fs.readFileSync(ran);
          Fg.sendMessage(from, buffer, image, {thumbnail: fakethumb, quoted: mek, caption: msg.done})
          fs.unlinkSync(ran);
        });
        break;
        
        case 'pinterest':
        case 'img':
        case 'imagen':
    if(!value) return m.reply(msg.notext)
    m.reply(msg.wait)
    go = await fgx.pinterest(value)
    pin = pickRandom(go)
    if(!pin) return m.reply('Error')
    Fg.sendMessage(from, await getBuffer(pin), image, { quoted: mek, caption: `✅ *${msg.resulf}*\n`, thumbnail: fakethumb })
 break 

   case 'man':
    mann = ['hombre', 'man', 'joven guapo']
    push = pickRandom(mann)
    m.reply(msg.wait)
    go = await fgx.pinterest(push)
    pin = pickRandom(go)
    if(!pin) return m.reply('Error')
    Fg.sendButtonImg(from, await getBuffer(pin), `✅ *${msg.resulf}*\n`, msg.next(command), `▷▷ ${msg.next2}`, `${prefix + command}`, mek)
 break

  case 'girl':
    woman = ['pretty girl', 'girl','russian girl', 'girl in bikinis', 'russian woman']
    push = pickRandom(woman)
    m.reply(msg.wait)
    go = await fgx.pinterest(push)
    pin = pickRandom(go) 
    if(!pin) return m.reply('Error')
    Fg.sendButtonImg(from, await getBuffer(pin), `✅ *${msg.resulf}*\n`, msg.next(command), `▷▷ ${msg.next2}`, `${prefix + command}`, mek)
 break
 
 case 'wallpaper':
 case 'wp':
    if(!value) return m.reply(msg.notext)
    m.reply(msg.wait)
    go = await fgx.pinterest(`Wallpaper hd ${value}`)
    pin = pickRandom(go)
    if(!pin) return m.reply('⚠️ Error')
    Fg.sendButtonImg(from, await getBuffer(pin), `✅ *${msg.resulf}*\n`, msg.next(command), `▷▷ ${msg.next2}`, `${prefix + command} ${value}`, mek)
 break
 
 case 'tomp3':
   if(isMedia || isQuotedVideo) {
     m.reply(msg.wait)
     q = m.quoted ? m.quoted : m 
     mp3 = await q.download()
     Fg.sendMessage(from, mp3, audio, {quoted: mek})
   } else {
     m.reply(msg.replyVid)
   }
   break

 case 'toav':
   if(!isQuotedAudio) return m.reply(msg.replyVn)
   m.reply(msg.wait)
   q = m.quoted ? m.quoted : m 
   vn = await q.download()
  Fg.sendMessage(from, vn, audio, {ptt: true, quoted: mek})
   break
   
   case 'report':
 case 'bug':
   if (!value) return m.reply(msg.notext)
   await addReport(sender, value)
   
   m.reply(`✅  *${pushname}* ${msg.bugr}`)
   break

 case 'listreport':
   if (!isOwner && !isBot) return m.reply(msg.owner)
   report = '*LIST REPORT*'
   for (var R of direc.report){
     report += `\n\n▢ Id : @` + R.id.split('@')[0]
     report += `\n▢ Report : ` + R.report
   }
   m.reply(report)
   break
   
   
   case 'listmedia':
   listimg = direc.image
   listvid = direc.video
   listaud = direc.audio
   liststik = direc.sticker
   teks = msg.liston+'\n\n'
   teks += '┌─⊷ *IMAGE* \n'
   	for ( v of listimg) { 
   	  teks += `▢  ${v}\n`
	  }
	  teks += '└──────────────\n'
	  teks += '┌─⊷ *VIDEO* \n'
	  for ( x of listvid) { 
   	  teks += `▢  ${x}\n`
	  }
	  teks += '└──────────────\n'
	  teks += '┌─⊷ *AUDIO* \n'
	  for ( y of listaud) { 
   	  teks += `▢  ${y}\n`
	  }
	  teks += '└──────────────\n'
	  teks += '┌─⊷ *STICKER* \n'
	  for ( z of liststik) { 
   	  teks += `▢  ${z}\n`
	  }
	  teks += '└──────────────\n'
	  teks += msg.getlist
	  m.reply(teks.trim())
   break
 
 case 'addimg':
   if(!value) return m.reply(msg.notext)
   if(isMedia || isQuotedImage) {
     for ( i of direc.image) {
        if(i === value.toLowerCase()) return m.reply(msg.packon)
        }
   q = m.quoted ? m.quoted : m 
   let img = await q.download() 
   fs.writeFileSync(`./database/media/image/${value.toLowerCase()}.jpeg`, img)
   m.reply(msg.done)
   await addImage(value.toLowerCase())
   } else {
     m.reply(msg.replyImg)
   }
   break

 case 'getimg':
   try { 
     mage = fs.readFileSync(`./database/media/image/${value.toLowerCase()}.jpeg`) 
     Fg.sendMessage(from, mage, image, { quoted: mek, caption: `✅ ${msg.resulf} : database image`, thumbnail: fakethumb })
     } catch {
       m.reply(msg.packoff)
     }
     break

 case 'addvid':
   if(!value) return m.reply(msg.notext)
   if(isMedia || isQuotedVideo) { 
     for ( i of direc.video) {
        if(i === value.toLowerCase()) return m.reply(msg.packon)
        }
   q = m.quoted ? m.quoted : m 
   vid = await q.download()
   fs.writeFileSync(`./database/media/video/${value.toLowerCase()}.mp4`, vid)
   m.reply(msg.done)
   await addVideo(value.toLowerCase())
   } else {
     m.reply(msg.replyVid)
   }
   break

 case 'getvid':
   try { 
     vid = fs.readFileSync(`./database/media/video/${value.toLowerCase()}.mp4`) 
     Fg.sendMessage(from, vid, video, { quoted: mek, caption: '✅ Resultado : database video' })
     } catch {
       m.reply(msg.packoff)
     }
     break


 case 'addav':
   if(!isQuotedAudio) return m.reply(msg.replyVn)
   if(!value) return m.reply(msg.notext)
   for ( i of direc.audio) {
        if(i === value.toLowerCase()) return m.reply(msg.packon)
        }
   q = m.quoted ? m.quoted : m 
   let aud = await q.download()
   fs.writeFileSync(`./database/media/audio/${value.toLowerCase()}.mp3`, aud)
   m.reply(msg.done)
   await addAudio(value.toLowerCase())
   break

 case 'getav':
   try { 
     vn = fs.readFileSync(`./database/media/audio/${value.toLowerCase()}.mp3`) 
     Fg.sendMessage(from, vn, audio, { quoted: mek, ptt: true})
     } catch {
       m.reply(msg.packoff)
     }
     break

 case 'addstick':
   if(!isQuotedSticker) return m.reply(msg.replyStic)
   if (!value) return m.reply(msg.notext)
   for ( i of direc.sticker) {
        if(i === value.toLowerCase()) return m.reply(msg.packon)
        }
   q = m.quoted ? m.quoted : m 
   let stic = await q.download()
   fs.writeFileSync(`./database/media/sticker/${value.toLowerCase()}.webp`, stic) 
   m.reply(msg.done)
   await addStiker(value.toLowerCase())
break

 case 'getstick':
   try { 
     tik = fs.readFileSync(`./database/media/sticker/${value.toLowerCase()}.webp`) 
     Fg.sendMessage(from, tik, sticker, { quoted: mek })
     } catch {
       m.reply(msg.packoff)
     }
     break
     case 'setfakethumb':
   if(!isOwner && !isBot) return m.reply(msg.owner)
   if(isMedia || isQuotedImage) {
   q = m.quoted ? m.quoted : m 
   thumb = await q.download() 
   fs.writeFileSync(`./temp/fake.jpg`, thumb)
   m.reply(msg.done)
   } else {
     m.reply(msg.replyImg)
   }
   break
   case 'fakethumb':
   if(isMedia || isQuotedImage) {
   q = m.quoted ? m.quoted : m 
   hasil = await q.download() 
   Fg.sendMessage(from, hasil, image, {quoted: mek, caption: msg.done, thumbnail: fakethumb})
   } else {
     m.reply(msg.replyImg)
   }
   break
   
   case 'trad':
 case 'translate':
   if(!value) return m.reply(msg.notext)
   to = args[0]
   bahasa = {
     id: 'indonesia',
     en: 'english', 
     es: 'español', 
     pt: 'portugués' 
   }
   var lang = to || 'es' 
   if (!bahasa[lang]) return m.reply('⚠️ Lenguaje no soportado : ' + lang);
   if(!m.quoted) {
     word = value.split(lang)[1]
   } else if(m.quoted){
     word = m.quoted.text
   }
   await translate(word, { to: lang }).then(res => {
     capt = 'a  ' + bahasa[to].toUpperCase()
     capt += '\n✅ trad : ' + res.text
      return m.reply(capt) 
   }).catch(err => {
        return m.reply('⚠️ Error')
      })
   break
   
   case 'ytsearch':
   case 'yts':
    if(!value) return m.reply(msg.notext)
				try {
		        	var aramas = await yts(value);
		   			} catch {
		        	return await Fg.sendMessage(from, 'Error!', MessageType.text, dload)
		    		}
		    		aramat = aramas.all 
		    		var tbuff = await getBuffer(aramat[0].image)
		    		var ytresult = '';
		    		ytresult += '「 *YOUTUBE SEARCH* 」'
		    		ytresult += '\n________________________\n\n'
		   			aramas.all.map((video) => {
		        	ytresult += '📌 *Título :* ' + video.title + '\n'
		            ytresult += '*🔗 Link* : ' + video.url + '\n'
		            ytresult += '*⏳ Duración* : ' + video.timestamp + '\n'
		            ytresult += '*📤 Publicado* : ' + video.ago + '\n________________________\n\n'
		    		});
		    		ytresult += '─── DyLux ┃ ᴮᴼᵀ ───'
		    		 Fg.sendMessage(from, tbuff, image, {thumbnail:fakethumb , quoted: mek, caption: ytresult})
		            break
   
   case "playstore":
     if(!value) return m.reply(msg.notext)
     m.reply(msg.wait)
     let play = await fgx.playstore(value); 
     store = '          *PLAY STORE*\n\n────────────────\n'
     for (let i of play) {
       store += `▢ *📌${msg.nme}* : ${i.name}
▢ *🔗 Link* : ${i.link}
▢ *👨🏻‍💻 Dev* : ${i.developer}
▢ *🔗 Link Dev* : ${i.link_dev}
────────────────\n`;
        } 
     m.reply(store);
   break;
   
   case 'google': 
   if (!value) return m.reply(msg.notext)
   m.reply(msg.wait)
   resgl = await gls({'query' : value})
   msg = resgl.map(({ title, link, snippet}) => {
    return `*${title}*\n${link}\n${snippet}`
  }).join`\n\n`
   await Fg.adReply(from, msg, text, ' BÚSQUEDA DE GOOGLE : ' + value, tanggal, thumbfg, linkIg)
   break
   
   case 'igvid':
 case 'igimg':
 case 'igdl':
 case 'ig':
   if(!isUrl(value) && !value) return m.reply(msg.nolink('instagram'));
   if(isUrl(value) && !value.match("instagram.com")) return m.reply('⚠️ Link invalido');
   m.reply(msg.wait)
   igdl = await fgx.igDl(value)
   buffer = await getBuffer(igdl.result.link)
   desk = igdl.result.desc
   if(!buffer) return m.reply('Error')
   if(igdl.result.link.match('.mp4')){
     //if(!isPremium) return m.reply(msg.premdl+igdl.result.link)
     Fg.sendMessage(from, buffer, video, {quoted: mek, caption: desk})
   } else {
     Fg.sendMessage(from, buffer, image, {quoted: mek, caption: msg.done, thumbnail: fakethumb})
   }
   break
   
    case 'tiktok':
 case 'tiktoknowm':
 case 'tiktokaudio':
   if(!isUrl(value) && !value) return m.reply(msg.nolink('tiktok'));
   if(isUrl(value) && !value.match("tiktok.com")) return m.reply('⚠️ Link invalido');
   m.reply(msg.wait)
   ttdl = await fgx.Ttdl(value)
   if(command.includes('nowm')) {
   buffer = await getBuffer(ttdl.result.nowatermark)
   if(!buffer) return m.reply('⚠️ Error')
   Fg.sendMessage(from, buffer, video, {quoted: mek, caption: msg.done})
   } else if (command.includes('audio')) {
     buffer = await getBuffer(ttdl.result.nowatermark)
     if(!buffer) return m.reply('⚠️ Error')
     Fg.sendMessage(from, buffer, document, {quoted: mek, mimetype: 'audio/mp4', filename: `Tiktokdescarga.mp3`})
   } else {
     buffer = await getBuffer(ttdl.result.watermark)
     if(!buffer) return m.reply('⚠️ Error')
     Fg.sendMessage(from, buffer, video, {quoted: mek, caption: msg.done})
     }
   break
   
   case 'play': 
   if (!value) return m.reply(`✳️ *${msg.plays}*\n\n📌${msg.exple} *${prefix + command}* Lil Peep broken smile`)
   url = await yts(value);
   linkp = url.all 
   if(!linkp) return ('Error')
 // img = await getBuffer(linkp[0].image)
 img = await (await fetch('https://i.ibb.co/CnHx2Fr/fgmy.jpg')).buffer()
   music = `≡ *FG MUSIC*
┌──────────────
▢ *${msg.titlp}*  : ${linkp[0].title}
▢ *${msg.timp}* : ${linkp[0].timestamp}
▢ *${msg.viep}* : ${linkp[0].views} 
└──────────────` 
 Fg.send2ButtonLoc(from, img, music, `${msg.pfo} *${prefix}play2*\n`, '🎶 MP3', `${prefix}fgmp3 ${linkp[0].url}`, '🎥 MP4', `${prefix}fgmp4 ${linkp[0].url}`)
 break
   
    case 'play2': 
   if (!value) return m.reply(`✳️ *${msg.plays}*\n\n📌${msg.exple} *${prefix + command}* Lil Peep broken smile`)
   url = await yts(value);
   link = url.all 
   if(!link) return ('Error')
 // img = await getBuffer(link[0].image)
 img = await (await fetch('https://i.ibb.co/CnHx2Fr/fgmy.jpg')).buffer()
   music = `≡ *PLAY MUSIC*
   
▢ *RESULTADOS*
≡ Music 1 
┌──────────────
▢ *${msg.titlp}*  : ${link[0].title}
▢ *${msg.timp}* : ${link[0].timestamp}
└──────────────
≡ Music 2
┌──────────────
▢ *${msg.titlp}*  : ${link[1].title}
▢ *${msg.timp}* : ${link[1].timestamp}
└──────────────
≡ Music 3
┌──────────────
▢ *${msg.titlp}*  : ${link[2].title}
▢ *${msg.timp}* : ${link[2].timestamp}
└──────────────` 
 Fg.send3ButtonLoc(from, img, music, `${msg.pafo}`, '⎙ Music 1', `${prefix}fgmp3 ${link[0].url}`, '⎙ Music 2', `${prefix}fgmp3 ${link[1].url}`, '⎙ Music 3', `${prefix}fgmp3 ${link[2].url}`)
 break
 
 case 'playvid': 
 case 'playmp4': 
 case 'playvideo': 
   if (!value) return m.reply(`✳️ *${msg.plays}*\n\n📌${msg.exple} *${prefix + command}* Lil Peep broken smile`)
   url = await yts(value);
   link = url.all 
   if(!link) return ('Error')
 // img = await getBuffer(link[0].image)
 img = await (await fetch('https://i.ibb.co/CnHx2Fr/fgmy.jpg')).buffer()
   music = `≡ *PLAY VIDEO*
   
▢ *RESULTADOS*
≡ Video 1 
┌──────────────
▢ *${msg.titlp}*  : ${link[0].title}
▢ *${msg.timp}* : ${link[0].timestamp}
└──────────────
≡ Video 2
┌──────────────
▢ *${msg.titlp}*  : ${link[1].title}
▢ *${msg.timp}* : ${link[1].timestamp}
└──────────────
≡ Video 3
┌──────────────
▢ *${msg.titlp}*  : ${link[2].title}
▢ *${msg.timp}* : ${link[2].timestamp}
└──────────────` 
 Fg.send3ButtonLoc(from, img, music, `${msg.pvfo}`, '⎙ Video 1', `${prefix}fgmp4 ${link[0].url}`, '⎙ Video 2', `${prefix}fgmp4 ${link[1].url}`, '⎙ Video 3', `${prefix}fgmp4 ${link[2].url}`)
 break
 
	case 'ytmp3':
	case 'fgmp3':
   if(!value) return m.reply(msg.nolink('youtube'));
   if(!isLinkyt(value)) return m.reply('⚠️ Link invalido');
   m.reply(msg.wait)
   resp = await fgx.yta(value)
   buff = await getBuffer(resp.link)
   if (!buff) return m.reply('⚠️ Error')
   if(Number(resp.size.split(' MB')[0]) >= 99.00) {
     axios.get(`https://tinyurl.com/api-create.php?url=${resp.link}`).then((G) => {
     return m.reply(msg.oversize + G.data)
     })
   } else {
     img = await getBuffer(resp.thumb)
     capt = `▢ ${msg.calidad} : ${resp.quality}
▢ ${msg.tamaño} : ${resp.size}`
     Fg.adReplyAudio(from, buff, document, resp.judul, capt, img, value, mek)
       }
	break
	
	case 'ytmp4': 
	case 'fgmp4': 
   if(!value) return m.reply(msg.nolink('youtube'));
   if(!isLinkyt(value)) return m.reply('⚠️ Link invalido');
   m.reply(msg.wait)
   resv = await fgx.ytv(value)
   buff = await getBuffer(resv.link)
   if (!buff) return m.reply('⚠️ Error')
   if(Number(resv.size.split(' MB')[0]) >= 99.00) {
     axios.get(`https://tinyurl.com/api-create.php?url=${resv.link}`).then((G) => {
     return m.reply(msg.oversize + G.data)
     })
   } else {
     img = await getBuffer(resv.thumb)
     capt = `▢ ${msg.calidad} : ${resv.quality}
▢ ${msg.tamaño} : ${resv.size}`
     await Fg.adReplyVideo(from, buff, document, resv.judul, capt, img, value, mek)
      }
	break

   

  case 'hidetag':
  case 'notify':
        if(!isOwner && !isBot && !isAdmins) return m.reply(msg.admin)
        if (!isGroup) return m.reply(msg.group);
        if(!m.quoted) {
          tag = value
        } else if(m.quoted){
          tag = m.quoted.text
        } else {
          tag = ''
        }
        group = await Fg.groupMetadata(from);
        mention = groupMembers.map(u => u.jid) 
        var optionshidetag = {
          text: tag,
          contextInfo: { mentionedJid: mention },
          quoted: mek,
        };
        Fg.sendMessage(from, optionshidetag, text);
        break;
        
        case 'tagall':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner && !isBot) return m.reply(msg.admin)
    mention = groupMembers.map(u => u.jid) 
    m.reply('TAG ALL\n\n' + mention.map((v, i) => i + 1 + '- @' + v.replace(/@.+/, '')).join`\n`, null, {
    contextInfo: { mentionedJid: mention }
  })
  break
  
  case 'join':
  case 'entrabot':
 //   if(!isOwner && !isBot) return
   if(!isPremium && !isOwner && !isBot) return m.reply(msg.premium)
    if(!value) return m.reply(`✳️Ingrese el link de tu Grupo`) 
    join = value.split('https://chat.whatsapp.com/')[1]
    await Fg.acceptInvite(join).then((res) => {
      Fg.sendMessage(res.gid,`🎈 Hola soy *${Fg.user.name}*\n\n_🛡️ Fui invitado por @${sender.split("@")[0]} para unirme al grupo_\n\n📌 Escriba *${prefix}help* para ver el Menu del bot`, text, {contextInfo:{mentionedJid:[sender]}})
      m.reply(`✅ Me uní correctamente al grupo`)
      }).catch((err) => m.reply("‣ "+jsonformat(err)))
    break 
    
    case 'link':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    code = await Fg.groupInviteCode(from)
    m.reply(`${msg.linkgp} *${groupName}*\n\nhttps://chat.whatsapp.com/${code}`) 
    break
    
case 'resetlink': 
case 'revokelink': 
case 'anularlink':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    Fg.query({ json: ['action', 'inviteReset', from], expect200: true })
linkgp = await Fg.groupInviteCode(from)
m.reply( `✅ ${msg.linkrevo}

📌 ${msg.newlink} : 
https://chat.whatsapp.com/${linkgp}`) 
 break
 
 case 'warn':
    if(!isGroup) return m.reply(msg.group)
    if(!isOwner && !isBot && !isAdmins) return m.reply(msg.admin)
    if(!dia) return m.reply(msg.notag)
    await addWarn(dia)
    warn = cekWarn(dia)
    if (warn === 3) {
      Fg.groupRemove(from, [dia]).catch((e) => {console.log(`⚠️ *ERROR:* ${e}`)})
      await delWarn(sender, 3)
      return m.reply(msg.bye)
     }
    m.reply(msg.addwarn)
    break

  case 'delwarn':
    if(!isGroup) return m.reply(msg.group)
    if(!isOwner && !isBot && !isAdmins) return m.reply(msg.admin)
    if(!dia) return m.reply(msg.notag)
    warn = cekWarn(dia)
    if (warn === 0) {
      return m.reply(msg.nowarn)
    }
    await delWarn(dia, 1)
    m.reply(msg.delwarn)
    break

  case 'checkwarn':
  case 'warns':
    warn = cekWarn(who)
    m.reply(msg.cekwarn(warn))
    break
    
    case 'addpremium':
    case 'addprem': 
    if(!isGroup) return m.reply(msg.group)
    if(!isOwner && !isBot) return m.reply(msg.owner)
    prem = cekPremium(dia)
    if (prem === true) {
      return m.reply(msg.isprem)
    }
    await addPremium(dia)
    m.reply(msg.done)
    break
    
  case 'delpremium':
  case 'delprem':
    if(!isGroup) return m.reply(msg.group)
    if(!isOwner && !isBot) return m.reply(msg.owner)
    prem = cekPremium(dia)
    if (prem === false) {
      return m.reply(msg.noprem)
    }
    await delPremium(dia)
    m.reply(msg.done)
    break
    
    case 'listpremium':
    case 'listprem':
 //  if(!isOwner) return m.reply(msg.owner)
   m.reply(msg.wait)
   capt = '*≡ List Premium*'
   for (var u of User) {
    if (u.premium === true) {
      capt += '\nId : @' + u.id.split('@')[0]
    }
  }
  m.reply(capt)
  break
    
    case 'banned':
    case 'ban':
    if(!isGroup) return m.reply(msg.group)
    if(!isOwner && !isBot) return m.reply(msg.owner)
    ban = cekBanned(dia)
    if (ban === true) {
      return m.reply(msg.ban)
    }
    await addBanned(dia)
    m.reply(msg.done)
    break
    
  case 'unbanned':
  case 'unban':
    if(!isGroup) return m.reply(msg.group)
    if(!isOwner && !isBot) return m.reply(msg.owner)
    ban = cekBanned(dia)
    if (ban === false) {
      return m.reply(msg.noban)
    }
    await delBanned(dia)
    m.reply(msg.done)
    break
    
    case 'listban':
 case 'listbanned':
   if(!isOwner) return m.reply(msg.owner)
   m.reply(msg.wait)
   capt = '*≡ Lista de Baneados*'
   for (var b of User) {
    if (b.banned === true) {
      capt += '\nId : @' + b.id.split('@')[0]
    }
  }
  m.reply(capt)
  break
    
    case 'group':
					if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
//if (args.length < 1) return reply(`✳️ Para abrir grupo : *${prefix + command}* open\npara cerrar grupo : *${prefix + command}* close`)
if (args[0] === 'open') {
 m.reply(msg.open)
Fg.groupSettingChange(from, GroupSettingChange.messageSend, false)
	} else if (args[0] === 'close') {
m.reply(msg.close)
Fg.groupSettingChange(from, GroupSettingChange.messageSend, true)
	} else if (!value) {
		Fg.send2Button(from, `${msg.gpbt}`, `${msg.gpbtt}`, `${msg.gpopenb}`, `${prefix + command} open`, `${msg.gpcloseb}`, `${prefix + command} close`)
		} 
		break
    
    case 'setname':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!value) return m.reply(msg.notext)
    await Fg.groupUpdateSubject(from, value)
    m.reply(msg.name(value))
    break

  case 'setppgp':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(isMedia || isQuotedImage) {
    q = m.quoted ? m.quoted : m 
    let img = await q.download() 
    await Fg.updateProfilePicture (from, img)
   } else {
     m.reply(msg.replyImg)
   }
    break

  case 'setppbot':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isOwner && !isBot) return m.reply(msg.admin)
    if(isMedia || isQuotedImage) {
    q = m.quoted ? m.quoted : m 
    let img = await q.download() 
    id = Fg.user.jid
    await Fg.updateProfilePicture (from, img)
   } else {
     m.reply(msg.replyImg)
   }
    break

  case 'setdesc':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!value) return m.reply(msg.notext)
    await Fg.groupUpdateDescription(from, value)
    m.reply(msg.desk(value))
    break
    
    case 'kick':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner && !isBot) return m.reply(msg.admin)
    if(!dia) return m.reply(msg.notag)
    //if(dia === isAdmins) return m.reply(msg.isadmin)
    anu = "@"+dia.split('@')[0]
    capt = msg.kick(anu)
    m.reply(capt, null, {
          contextInfo: {
            mentionedJid: Fg.parseMention(capt),
          },
        });
    await Fg.groupRemove(from, [dia])
    break

  case 'add':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isOwner && !isBot) return m.reply(msg.owner)
    //if(!dia) return m.reply(msg.notag)
    user = value.replace(/[^0-9]/g, '')+"@s.whatsapp.net"
    try {
    response = await Fg.groupAdd(from, [user])
    v = response.participants[0]
    invit = (Object.values(v))
    if(invit[0].code == 409) return m.reply(msg.onwa)
    else if(invit[0].code == 403){
    capt = msg.sendlink+"@"+user.split('@')[0]
    m.reply(capt, null, {
          contextInfo: {
            mentionedJid: Fg.parseMention(capt),
          },
        });
    Fg.sendGroupV4Invite(from, user, invit[0].invite_code, invit[0].invite_code_exp, groupMetadata.subject , `✳️ Te invito a unirte a un grupo`)
    }
    } catch (e) {
      m.reply(msg.nonum)
    }
    break 
    
    //-- envía en link de invitación a un número
    case 'invite':
    case 'invitar':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!value) return m.reply(msg.nonum)
    users = value.replace(/[^0-9]/g, '')+"@s.whatsapp.net"
    ini = await Fg.groupInviteCode(from)
    link = 'https://chat.whatsapp.com/'+ini 
    Fg.sendMessage(users, "@"+sender.split("@")[0]+"\n Un admin te invita a unirte a este grupo\n"+link, text, {
          contextInfo: {
            mentionedJid: [sender],
          }})
          m.reply(msg.done)
    break
    
    case 'promote':
    case 'promover':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!dia) return m.reply(msg.notag)
    
    await Fg.groupMakeAdmin (from, [dia])
    anu = "@"+dia.split('@')[0]
    capt = msg.promote(anu)
    m.reply(capt, null, {
          contextInfo: {
            mentionedJid: Fg.parseMention(capt),
          },
        });
    break

  case 'demote':
  case 'degradar':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!dia) return m.reply(msg.notag)
 
    await Fg.groupDemoteAdmin (from, [dia]) //demote admins
    anu = "@"+dia.split('@')[0]
    capt = msg.demote(anu)
    m.reply(capt, null, {
          contextInfo: {
            mentionedJid: Fg.parseMention(capt),
          },
        });
    break

  case 'welcome':
  case 'bienvenida':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner && !isBot) return m.reply(msg.admin)
    //if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!value) return m.reply(msg.OnorOff)
    if (value.toLowerCase() === "on") {
      if(isWelcome === true ) return m.reply(msg.Thison(command.toUpperCase()))
      await addWelcome(from)
      m.reply(msg.On(command.toUpperCase()))
    } else if (value.toLowerCase() === "off") {
      if(isWelcome === false ) return m.reply(msg.Thisoff(command.toUpperCase()))
      await delWelcome(from)
      m.reply(msg.Off(command.toUpperCase()))
    } else {
      m.reply(msg.OnorOff)
    }
    break
    
    case 'detect':
    case 'detector':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner && !isBot) return m.reply(msg.admin)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!value) return m.reply(msg.OnorOff)
    if (value.toLowerCase() === "on") {
      if(isDetect === true ) return m.reply(msg.Thison(command.toUpperCase()))
      await addDetect(from)
      m.reply(msg.On(command.toUpperCase()))
    } else if (value.toLowerCase() === "off") {
      if(isDetect === false ) return m.reply(msg.Thisoff(command.toUpperCase()))
      await delDetect(from)
      m.reply(msg.Off(command.toUpperCase()))
    } else {
      m.reply(msg.OnorOff)
    }
    break
    
  case 'antidelete':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner && !isBot) return m.reply(msg.admin)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!value) return m.reply(msg.OnorOff)
    if (value.toLowerCase() === "on") {
      if(isAntidelete === true ) return m.reply(msg.Thison(command.toUpperCase()))
      await addAntidelete(from)
      m.reply(msg.On(command.toUpperCase()))
    } else if (value.toLowerCase() === "off") {
      if(isAntidelete === false ) return m.reply(msg.Thisoff(command.toUpperCase()))
      await delAntidelete(from)
      m.reply(msg.Off(command.toUpperCase()))
    } else {
      m.reply(msg.OnorOff)
    }
    break
    
    case 'antilink':
    case 'antilinkwha':
    case 'antilinkwa':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner && !isBot) return m.reply(msg.admin)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!value) return m.reply(msg.OnorOff)
    if (value.toLowerCase() === "on") {
      if(isAntilink === true ) return m.reply(msg.Thison(command.toUpperCase()))
      await addAntilink(from)
      m.reply(msg.On(command.toUpperCase()))
    } else if (value.toLowerCase() === "off") {
      if(isAntilink === false ) return m.reply(msg.Thisoff(command.toUpperCase()))
      await delAntilink(from)
      m.reply(msg.Off(command.toUpperCase()))
    } else {
      m.reply(msg.OnorOff)
    }
    break
    
    case 'antiviewonce':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner && !isBot) return m.reply(msg.admin)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!value) return m.reply(msg.OnorOff)
    if (value.toLowerCase() === "on") {
      if(isViewonce === true ) return m.reply(msg.Thison(command.toUpperCase()))
      await addViewonce(from)
      m.reply(msg.On(command.toUpperCase()))
    } else if (value.toLowerCase() === "off") {
      if(isViewonce === false ) return m.reply(msg.Thisoff(command.toUpperCase()))
      await delViewonce(from)
      m.reply(msg.Off(command.toUpperCase()))
    } else {
      m.reply(msg.OnorOff)
    }
    break
    
    //-- auto Simsimi 
    case 'chatbot': 
    // if(!isGroup) return m.reply(msg.group)
    if(!value) return m.reply(msg.OnorOff)
    if (value.toLowerCase() === "on") {
      if(isChatbot === true ) return m.reply(msg.Thison(command.toUpperCase()))
      await addChatbot(sender)
      m.reply(msg.chatboton)
    } else if (value.toLowerCase() === "off") {
      if(isChatbot === false ) return m.reply(msg.Thisoff(command.toUpperCase()))
      await delChatbot(sender)
      m.reply(msg.chatbotoff)
    } else {
      m.reply(msg.OnorOff)
    }
    break 
    
    /*case 'voicecommand':
    case 'voicecmd':
    if(!isPremium && !isOwner) return m.reply(msg.premium)
   // if(isGroup) return m.reply(msg.private)
    if(!value) return m.reply(msg.OnorOff)
    if (value.toLowerCase() === "on") {
      if(isVoiceCommand === true ) return m.reply(msg.Thison(command.toUpperCase()))
      await addVoiceCommand(sender)
      m.reply(msg.done)
    } else if (value.toLowerCase() === "off") {
      if(isVoiceCommand === false ) return m.reply(msg.Thisoff(command.toUpperCase()))
      await delVoiceCommand(sender)
      m.reply(msg.done)
    } else {
      m.reply(msg.OnorOff)
    }
    break*/
    

  case 'q': 
    if (!m.quoted) return m.reply(msg.reply)
    let qse = Fg.serializeM(await m.getQuotedObj())
    if (!qse.quoted) return m.reply(msg.noreply)
    await qse.quoted.copyNForward(from, true)
    break 
    
    case 'fetch':
 case 'result':
 case 'view':
   if(!isOwner && !isBot) return m.reply(msg.owner)
   let res = await fetchText(value)
   m.reply(res)
   break
   
   case 'perfil':
   case 'profile':
   if(!isGroup) return m.reply(msg.group)
   try {
	      ppimg = await Fg.getProfilePicture(who);
	    } catch {
	      ppimg = 'https://i.ibb.co/PZNv21q/Profile-FG98.jpg';
	    }
	 Prema = cekPremium(who) ? 'Si' : 'No'
   perfil = ` ┌───「 *${msg.pfile}* 」
▢ *🔖 ${msg.nme}:* ${pushname}
▢ *📇 Info:* ${about}
▢ *🌎 ${msg.idiom}:* ${cekBahasa(who)}
▢ *⚠️ ${msg.wrn}* : ${cekWarn(who)}/3
▢ *⭐ Premium* : ${Prema}
▢ *🆙 ${msg.lvl}* : ${cekLevel(who)}
▢ *💰Coins* : ${cekPoin(who)} 
└──────────────`
prof = await getBuffer(ppimg)
Fg.sendMessage(from, prof, image, { thumbnail: fakethumb, quoted: mek, caption: perfil})
   break
   
   case 'infogp':
   case 'groupinfo':
   if(!isGroup) return m.reply(group)
   try {
	      ppimg = await Fg.getProfilePicture(from);
	    } catch {
	      ppimg = 'https://i.ibb.co/PZNv21q/Profile-FG98.jpg';
	    }
   isAntilink = isAntilink ? 'Si' : 'No' 
   isAntidelete = isAntidelete ? 'Si' : 'No' 
   isDetect = isDetect ? 'Si' : 'No' 
   isWelcome = isWelcome ? 'Si' : 'No' 
   isViewonce = isViewonce ? 'Si' : 'No'
   creation = moment(groupMetadata.creation * 1000).tz('America/La_Paz').format(`DD-MM-YYYY`)
   //ownergp = groupMetadata.owner.split('@')[0]
   
   infogpp = `┌──「 *INFO DE GRUPO* 」
▢ *🔖${msg.nme}* : ${groupName}
▢ *🪀${msg.crtio}* : ${creation}
▢ *🕵🏻‍♂️Admins* : ${groupAdmins.length}
▢ *👥${msg.mbr}* : ${groupMembers.length}
≡ CONFI
▢ *📮${msg.wlme}* : ${isWelcome}
▢ *🚨Anti Link Wha* : ${isAntilink}
▢ *🚫 Antidelete* : ${isAntidelete}
▢ *👀ViewOnce* : ${isViewonce}
▢ *❕Detected* : ${isDetect}
▢ *📌Descripción* : \n${groupDesc}`
gpp = await getBuffer(ppimg)
Fg.sendMessage(from, gpp, image, { thumbnail: fakethumb, quoted: mek, caption: infogpp})
break 

case 'grouplist':
case 'listgp':
case 'listgroup':
   if(!isOwner) return m.reply(msg.owner)
   capt = totalchat.filter(z => z.jid.endsWith('g.us')).map((z, i) =>`
────────────
*${i + 1}.* ${Fg.getName(z.jid)}
• *🛡️ID* : ${z.jid}
• *🏮Estado* : ${z.read_only ? 'Abandonado' : 'Dentro'}
────────────`).join`\n\n`
  m.reply(`≡ *${msg.listgp}*\n\n${capt}`)
  break  
  
case 'voting':
case 'votacion':
   if(!isGroup) return m.reply(msg.group)
   if(!isAdmins) return m.reply(msg.admin)
   if(!value) return m.reply(msg.notext)
   Fg.vote = Fg.vote ? Fg.vote : {}
    if (from in Fg.vote) {
        await m.reply(msg.main(msg.vtc))
        return false
    }
    caption = `≡ *${msg.vtc}*

${msg.rzon} : ${value}

✅ : *${msg.vyes}*
❌ : *${msg.vno}*`
    Fg.vote[from] = [
        await Fg.send2Button(from, caption, `${msg.foll}`, '✅', `${prefix}yes`, '❌', `${prefix}no`, false, { contextInfo:{
          mentionedJid: Fg.parseMention(caption)
        }}),
        [],
        [],
        value,
    ]
    break
    
    case 'delvote':
    case 'delvoto':
   if(!isGroup) return m.reply(msg.group)
   if(!isAdmins) return m.reply(msg.admin)
    if (!(from in Fg.vote)) {
        await m.reply(msg.nomain(msg.vtc))
        return false
    }
    delete Fg.vote[from]
    m.reply(msg.hapus(msg.vtc))
    break

 case 'yes':
   if(!isGroup) return m.reply(msg.group)
   if (!(from in Fg.vote)) {
       m.reply(msg.nomain(msg.vtc))
       return false
    }
    vote = Fg.vote[from][1]
    devote = Fg.vote[from][2]
    inVote = vote.includes(sender)
    inDevote = devote.includes(sender)
    if (inVote) return m.reply(msg.inmain('✅'))
    if (inDevote) return m.reply(msg.inmain('❌'))
    vote.push(sender)
    listVote = vote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    listDevote = devote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
        caption = `*${msg.vtc}*

${msg.rzon} : ${Fg.vote[from][3]}

✅ : ${vote.length} *Total*
${listVote}

❌ : ${devote.length} *Total*
${listDevote}`.trim()
    await Fg.send3Button(from, caption, `${msg.foll}`, '✅', `${prefix}yes`, '❌', `${prefix}no`, `📈 ${msg.vrvt}`, `${prefix}checkvote`, false, { contextInfo: { mentionedJid: Fg.parseMention(caption) } })
    break

 case 'no':
   if(!isGroup) return m.reply(msg.group)
   if (!(from in Fg.vote)) {
       m.reply(msg.nomain(msg.vtc))
       return false
    }
    vote = Fg.vote[from][1]
    devote = Fg.vote[from][2]
    inVote = vote.includes(sender)
    inDevote = devote.includes(sender)
    if (inVote) return m.reply(msg.inmain('✅'))
    if (inDevote) return m.reply(msg.inmain('❌'))
    devote.push(sender)
    listVote = vote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    listDevote = devote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
        caption = `*${msg.vtc}*

${msg.rzon} : ${Fg.vote[from][3]}

✅ : ${vote.length} *Total*
${listVote}

❌ : ${devote.length} *Total*
${listDevote}`.trim()
    await Fg.send3Button(from, caption, `${msg.foll}`, '✅', `${prefix}yes`, '❌', `${prefix}no`, `📈 ${msg.vrvt}`, `${prefix}checkvote`, false, { contextInfo: { mentionedJid: Fg.parseMention(caption) } })
    break


 case 'checkvote':
   if(!isGroup) return m.reply(msg.group)
  // if(!isAdmins) return m.reply(msg.admin)
   if (!(from in Fg.vote)) {
        await m.reply(msg.nomain(msg.vtc))
        throw false
    }
    vote = Fg.vote[from][1]
    devote = Fg.vote[from][2]
    listVote = vote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    listDevote = devote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    caption = `≡ *${msg.rtvt}*

${msg.rzon} : ${Fg.vote[from][3]}

✅ : ${vote.length} *Total*
${listVote}

❌ : ${devote.length} *Total*
${listDevote}`.trim()
    await Fg.sendButton(from, caption, `${msg.foll}`, `🚫 ${msg.dlte}`, `${prefix}delvote`, false, { contextInfo: { mentionedJid: Fg.parseMention(caption) } })
break

case 'riddle':
      Fg.game = Fg.game ? Fg.game : {}
    if (from in Fg.game) {
        Fg.reply(from, msg.onGame, Fg.game[from][0])
        return false
        } 
        data = fs.readFileSync(`./result/game/${command}-es.js`);
        list = JSON.parse(data);
        random = Math.floor(Math.random() * list.length);
        json = list[random]
        caption = msg.soal(json.soal, (isgameTime / 1000).toFixed(2), isPoingame).trim()
    Fg.game[from] = [
        await Fg.reply(from, caption, m),
        json.jawaban,
        setTimeout(() => {
          capt = Fg.game[from][1].replace(/[aiueoAIUEO]/gi, '_')
          m.reply("*Pista*\n"+capt.toUpperCase())
        }, isgameTime - 10000),
        setTimeout(() => {
           Fg.reply(from, msg.timeout + Fg.game[from][1].toUpperCase(), Fg.game[from][0])
            delete Fg.game[from]
        }, isgameTime)
    ]
 break
 
 case 'setprefix':
    if (!isOwner && !isBot) return m.reply(msg.owner)
    //if (!value) return m.reply(msg.notext)
   if((args[0]) == 'multi'){
      if(Use.multi) return m.reply(msg.Thison(command.toUpperCase()))
      Use.multi = true
      Use.nopref = false
      Use.onepref = false
      m.reply(msg.setpmulti)
  } else if ((args[0]) == 'nopref'){
      if(Use.nopref) return m.reply(msg.Thison(command.toUpperCase()))
      Use.multi = false
      Use.onepref = false
      Use.nopref = true
      m.reply(msg.setpnopre)
    } else if ((args[0]) === 'onepref') {
      if(Use.onepref) return m.reply(msg.Thison(command.toUpperCase()))
      Use.multi = false
      Use.nopref = false
      Use.onepref = true
      m.reply(`${msg.setponepre} *${Use.prefix}*`)
    } else if (!value) {
    	Fg.send3Button(from, `✳️ ${msg.setpall}\n\n• *multi* _${msg.setpmt}_\n• *nopref* _${msg.setpnp}_ \n• *onepref* _${msg.setpop}_`, `${msg.gpbtt}`, `${msg.setpop}`, `${prefix + command} onepref`, `${msg.setpnp}`, `${prefix + command} nopref`, `${msg.setpmt}`, `${prefix + command} multi`)
   } 
    break
    
    case 'update':
    case 'actualizar':
if (!isOwner && !isBot) return m.reply(msg.owner)
exec(`git pull`, (err, stdout) => {
if (err) return m.reply(err) 
if (stdout) m.reply(`✅ ${msg.updatef} :\n\n${stdout}`)
})
break

case 'restart': 
  case 'reiniciar': 
    if(!isOwner && !isBot) return m.reply(msg.owner)
    m.reply(msg.restart)
try {
  process.send('reset')
} catch (e) {
  m.reply('...')
}
  break

case 'setwelcome':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    fungsi = `
@user = @${sender.split('@')[0]}
@name = ${pushname}
@bio = ${about}
@date = ${tanggal}
@group = ${groupName}
@desc = ${groupDesc}
`
    if(!value) return m.reply(msg.setwel(fungsi))
     await setCustomWelcome(from, value)
     m.reply(msg.setweldone(value, fungsi))
     break

  case 'setbye':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
fungsi = `
@user = @${sender.split('@')[0]}
@name = ${pushname}
@bio = ${about}
@date = ${tanggal}
@group = ${groupName}`
    if(!value) return m.reply(msg.setbye(fungsi))
    await setCustomBye(from, value)
    m.reply(msg.setbyedone(value, fungsi))
    break

case 'delwelcome':
  case 'delbye':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner && !isBot) return m.reply(msg.owner)
    if(command.includes('welcome')){
      await delCustomWelcome(from)
      m.reply(msg.default('WELCOME'))
    } else if(command.includes('bye')){
      await delCustomBye(from)
      m.reply(msg.default('BYE'))
    }
  break

  case 'simulate':
 case 'simular':
   if(!isGroup) return m.reply(msg.group)
   if(!isAdmins && !isOwner && !isBot) return m.reply(msg.admin)
   if(!value) return m.reply(`${msg.listwb}\n\n▢ Welcome\n▢ Bye`)
   welc = getCustomWelcome(from)
   bye = getCustomBye(from)
   tag = '@'+sender.split('@')[0]
   try {
	      ppimg = await Fg.getProfilePicture(who);
	    } catch {
	      ppimg = 'https://i.ibb.co/PZNv21q/Profile-FG98.jpg';
	    }
	welm = await getBuffer(ppimg)
   if(value.toLowerCase() === 'welcome') {
     capt = welc.replace('@user', tag).replace('@name', pushname).replace('@bio', about).replace('@date', tanggal).replace('@desc', groupDesc).replace('@group', groupName) 
 // Fg.sendMessage(from, welm, image, {contextInfo: {  mentionedJid: [sender]}, thumbnail: fakethumb, quoted: mek, caption: capt})
Fg.send2ButtonLoc(from, welm, capt, 'Sígueme en Instagram\nhttps://www.instagram.com/fg98._', '⦙☰ MENU', '/menu', '⏍ INFO GP', '/infogp', false, {
	      contextInfo: { 
            mentionedJid: Fg.parseMention(capt)
	      } 
	    }); //--
     } else if(value.toLowerCase() === 'bye') {
       capt = bye.replace('@user', tag).replace('@name', pushname).replace('@bio', about).replace('@date', tanggal).replace('@group', groupName)       
  //Fg.sendMessage(from, welm, image, {contextInfo: {  mentionedJid: [sender]}, thumbnail: fakethumb, quoted: mek, caption: capt})
   Fg.sendButtonLoc(from, welm, capt, 'Sígueme en Instagram\nhttps://www.instagram.com/fg98._', '👋🏻', 'unde', false, {
	      contextInfo: { 
            mentionedJid: Fg.parseMention(capt)
	      } 
	    });//---
     } else {
       m.reply(`${msg.listwb}\n\n▢ Welcome\n▢ Bye`)
     }
  break 

  
  case 'attp':
	          if(!value) return m.reply(msg.notext)
		      m.reply(msg.wait)
					var teks = encodeURIComponent(args.join(' '))
					const attp = await getBuffer(`https://api.xteam.xyz/attp?file&text=${teks}`)
					Fg.sendMessage(from, attp, sticker, {quoted: mek})
					  break 
					
case 'simi':
case 'bot':
		 if (args.length < 1) return m.reply(`${msg.hi} _*${pushname}*_ ${msg.simn} *${prefix + command}* ${msg.simmsg} ${prefix + command} ${msg.hi} bot`)
		result = await fetchJson(`https://api-sv2.simsimi.net/v2/?text=${value}&lc=${cekBahasa(who)}`, {method: 'get'})
        m.reply(result.success.replace('simsimi', 'DyLux').replace('Simsimi', 'DyLux').replace('sim simi', 'DyLux'))
                     break
                                   
 case 'suit':
 case 'ppt':
    salah = `✳️ ${msg.pptt} ${msg.piedra}/${msg.papel}/${msg.tijera}\n\n${msg.exple} : *${prefix + command}* ${msg.papel}\n`
    poin = 200
    if (!value) return m.reply(salah)
    var ppt = Math.random()
    if (ppt < 0.34) {
        ppt = `${msg.piedra}`
    } else if (ppt > 0.34 && ppt < 0.67) {
        ppt = `${msg.tijera}`
    } else {
        ppt = `${msg.tijera}`
    }
    //determinar las reglas
    if (value == ppt) {
      await addPoin(sender, 100)
        m.reply(`▢ *${msg.emt}*\n\n‣ ${msg.pptuser} : ${value}\n‣ DyLux : ${ppt}\n\n🎁  (±)100 Coins`)
    } else if (value == `${msg.piedra}`) {
        if (ppt == `${msg.tijera}`) {
          await addPoin(sender, poin)
            m.reply(`▢ *${msg.gst}* 🎊\n\n‣ ${msg.pptuser} : ${value}\n‣ DyLux : ${ppt}\n\n🎁  *+${poin} Coins*`)
        } else {
          await delPoin(sender, poin)
            m.reply(`▢ *${msg.pdt}*\n\n‣ ${msg.pptuser} : ${value}\n‣ DyLux : ${ppt}\n\n  *-${poin} Coins*`)
        }
    } else if (value == `${msg.tijera}`) {
        if (ppt == `${msg.papel}`) {
          await addPoin(sender, poin)
            m.reply(`▢ *${msg.gst}* 🎊\n\n‣ ${msg.pptuser} : ${value}\n‣ DyLux : ${ppt}\n\n🎁  *+${poin} Coins*`)
        } else {
          await delPoin(sender, poin)
            m.reply(`▢ *${msg.pdt}*\n\n‣ ${msg.pptuser} : ${value}\n‣ DyLux : ${ppt}\n\n  *-${poin} Coins*`)
        }
    } else if (value == `${msg.papel}`) {
        if (ppt == `${msg.piedra}`) {
          await addPoin(sender, poin)
            m.reply(`▢ *${msg.gst}* 🎊\n\n‣ ${msg.pptuser} : ${value}\n‣ DyLux : ${ppt}\n\n🎁  *+${poin} Coins*`)
        } else {
          await delPoin(sender, poin)
            m.reply(`▢ *${msg.pdt}*\n\n‣ ${msg.pptuser} : ${value}\n‣ DyLux : ${ppt}\n\n  *-${poin} Coins*`)
        }
    } else {
       m.reply(salah)
    }
    break
    
  case 'say':
    if(!value) return m.reply(msg.notext)
    Fg.sendMessage(from, value, text)
    break
    
    case 'mediafire':
    case 'mfire':
    if(!value) return m.reply(msg.nolink('Mediafire'));
   if(!isUrl(args[0]) && !args[0].includes('mediafire')) m.reply('⚠️ Link invalido');
m.reply(msg.wait)
mfir = await fgx.mfire(value)
result = `   ≡ *MEDIAFIRE*

▢ *${msg.nme}* : ${mfir[0].name}
▢ *${msg.tamaño}* : ${mfir[0].size}
▢ *Link* : ${mfir[0].link}`
m.reply(result)
sendFileFromUrl(mfir[0].link, document, {mimetype: mfir[0].mime, filename: mfir[0].name, quoted: mek})
break


//-------------------- FG98 ------------
  default:
  
    if (budy.startsWith('$')){
      if (!isOwner && !isBot) return;
      qur = budy.slice(2);
      exec(qur, (err, stdout) => {
        if (err) return m.reply(`‣  ${err}`);
        if (stdout) {
          m.reply(stdout);
          }
          });
          }
          
    if (budy.startsWith('>')){
      if (!isOwner && !isBot) return;
      try {
        Fg.sendMessage(from, "‣ "+JSON.stringify(eval(budy.slice(2)),null,'\t'), text, {quoted: mek});
        } catch(err) {
          e = String(err);
          m.reply("‣ "+e); }}} 

    let isLink = 'https://chat.whatsapp.com/'
    if(budy.match(isLink) && isAntilink === true ) {
      if(isAdmins && isOwner && isBot) return
      if(!isBotAdmins) return
      code = await Fg.groupInviteCode(from) 
      if(budy.match(isLink+code)) {
        return !0
      } else {
        m.reply(msg.antilink)
        await addWarn(sender)
        m.reply(msg.addwarn)
        cek = await cekWarn(sender)
        if(cek === 2) {
          await Fg.groupRemove(from, [sender])
          await delWarn(sender, 2)
        }
      }
    }


// usuario Afk
let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (let jid of jids) {
    let isOnAfk = cekAfk(jid);
    let isOnAfkTime = cekAfkTime(jid);
    let isOnAfkReason = cekAfkReason(jid);
      if(isOnAfk && isGroup && !mek.isBaileys) {
        return m.reply(msg.inAfk(isOnAfkReason, isOnAfkTime))
      }
  }


if (isVoiceCommand && type === "audioMessage"){
   let int
    let infoMSG = JSON.parse(fs.readFileSync('./database/msg.data.json'))
    for (let i = 0; i < infoMSG.length; i++){
    const dataInfo = infoMSG[i]
    const type = Object.keys(infoMSG[i].messageTimestamp)
    const timestamp = infoMSG[i].messageTimestamp
    int = {
    no : i,
    type: type,
    timestamp: timestamp,
    data: dataInfo 
    }
    }
    const file = await Fg.downloadAndSaveMediaMessage(int.data)
    const stream = fs.createReadStream(file);
    const form = new FormData();
    form.append('audio', stream);
    const UrL = await fetch('http://hujanapi.xyz/api/stt?apikey=' + hujanapi, { method: 'POST', body: form })
    const ret =  await UrL.json()
    const voiceMsg = ret.result ? ret.result : `${msg.vcnrst}`
    m.reply(`🎙️ ${msg.vclect} : ${voiceMsg}`)
    const VoiceCommand = voiceMsg.trim().split(/ +/).shift().toLowerCase();
    const argsVn = voiceMsg.trim().split(/ +/).slice(1);
    const valueVn = argsVn.join(' ');
    
/**
 * comando principal VoiceCommand
 * créditos by @https://github.com/AlvioAdjiJanuar 
 * fix FG98
*/
switch(VoiceCommand) {
  
 case 'menu': 
 case 'help':
    capt = `────  *DyLux  ┃ ᴮᴼᵀ*  ────
    
${msg.hi} *${pushname}* ${ucapanWaktu}
    
⎔ *${msg.lvl}* : ${isLevel}
⎔ *Premium* : ${prem}

▢ ${msg.cretb}
• https://youtu.be/F4lGWb1WXgM 

${readMore}
${menu(prefix)} 
`
    Fg.send3ButtonLoc(from, thumbfg, capt, `▢ *DyLux  ┃ ᴮᴼᵀ*\n▢ *Total Hits* : ${isTotalcmd}\n▢ *Usuarios* : ${User.length}\n▢ *Runtime* : ${kyun(process.uptime())}\n\n${msg.foll}`, `⦙☰ Menu Vc`, `${prefix}menuvc`, '✆ Owner', `${prefix}owner`, '⏍ Info', `${prefix}info`)
    break
  
  case 'google':
   if (!valueVn) return
   m.reply(msg.wait)
   way = await gls({'query' : valueVn})
   msg = way.map(({ title, link, snippet}) => {
    return `*${title}*\n${link}\n${snippet}`
  }).join`\n\n`
   await Fg.adReply(from, msg, text, 'BÚSQUEDA DE GOOGLE : ' + value, tanggal, thumbfg, linkIg)
   break

  case 'play': 
   if (!valueVn) return
   url = await yts(valueVn);
   link = url.all 
   if(!link) return ('⚠️ Error')
   m.reply(msg.wait)
   goo = await fgx.yta(link[0].url)
   buff = await getBuffer(goo.link)
   if (!buff) return m.reply('⚠️ Error')
   if(Number(goo.size.split(' MB')[0]) >= 99.00) {
     axios.get(`https://tinyurl.com/api-create.php?url=${goo.link}`).then((G) => {
     return m.reply(msg.oversize + G.data)
     })
   } else {
     img = await getBuffer(goo.thumb)
     capt = `▢ ${msg.calidad} : ${goo.quality}
▢ ${msg.tamaño} : ${goo.size}`
     await Fg.adReplyAudio(from, buff, document, goo.judul, capt, img, link[0].url, mek)
               }
	break
    default:
}
}


/**
 * url 1 = https://api.simsimi.net/v2/?text=${budy}&lc=es&cf=false
 * url 2 = https://api-sv2.simsimi.net/v2/?text=${budy}&lc=es&cf=false 
 * chatbot // configúrelo como desee, elija uno si da un error
*/

if(!isCmd && isChatbot === true){
 // if(!mek.isBaileys) return
 // if(isGroup) return
 // if(!isPremium) return
  if(m.mtype == 'stickerMessage') return
  result = await fetchJson(`https://api-sv2.simsimi.net/v2/?text=${budy}&lc=${cekBahasa(who)}`, {method: 'get'})
  m.reply(result.success.replace('simsimi', 'DyLux').replace('Simsimi', 'DyLux').replace('sim simi', 'DyLux'))
}

// antiview once
if (m.mtype == 'viewOnceMessage' && isViewonce === true){
  msg = {...mek}
  msg.message = mek.message.viewOnceMessage.message
  msg.message[Object.keys(msg.message)[0]].viewOnce = false
  m.reply('ViewOnce *Detectado*')
  Fg.copyNForward(from, msg)
}

// respuestas del juego
   if (!Fg.game || !m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.quoted.text) return !0
    if (Fg.game[from] && m.quoted.from == Fg.game[from][0].from) {
        if (m.text.toLowerCase() == Fg.game[from][1].toLowerCase().trim()) {
            m.reply(msg.benar(Fg.game[from][1].toUpperCase(), isPoingame))
            await addPoin(sender, isPoingame)
            clearTimeout(Fg.game[from][2])
            clearTimeout(Fg.game[from][3])
            delete Fg.game[from]
        } else if (similarity(m.text.toLowerCase(), Fg.game[from][1].toLowerCase().trim()) >= threshold) m.reply(msg.hampir)
        else m.reply(msg.salah)
    }
    

} catch (e) {
  console.log(bgcolor('‣ Alerta :', 'red'), e);
}
};

/**
 * WhatsApp bot  baileys
 * 
 * Thank to 
 - https://github.com/MhankBarBar/weabot
 - https://github.com/Nurutomo/wabot-aq
*/
