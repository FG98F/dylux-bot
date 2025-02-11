

import fetch from 'node-fetch'
let handler= async (m, { conn, args, text, usedPrefix, command }) => {
	
    if (!args[0]) throw `✳️ ${mssg.noUsername}\n\n📌${mssg.example} : ${usedPrefix + command} fg98_ff` 
    try {
    let pon = await fetch(global.API('fgmods', '/api/search/igstalk', { username: args[0] }, 'apikey'))
    let res = await pon.json()
    let te = `
┌──「 *STALKING* 
▢ *🔖${mssg.name}:* ${res.result.fullName} 
▢ *🔖${mssg.username}:* ${res.result.username}
▢ *👥${mssg.followers}:* ${res.result.followers}
▢ *🫂${mssg.follows}:* ${res.result.following}
▢ *📌${mssg.bio}:* ${res.result.bio}
▢ *🏝️${mssg.posts}:* ${res.result.postsCount}
▢ *🔗${mssg.link}:* https://instagram.com/${res.result.username.replace(/^@/, '')}
└────────────`

     await conn.sendFile(m.chat, res.result.photoUrl, 'tt.png', te, m)
    } catch {
        m.reply(`✳️ ${mssg.error}`)
      }
     
}
handler.help = ['igstalk']
handler.tags = ['dl']
handler.command = ['igstalk'] 

export default handler
