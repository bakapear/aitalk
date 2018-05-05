let got = require("got")
let cleverbot = require("cleverbot.io")

let config = {
    user: process.env.API_USER,
    key: process.env.API_KEY,
    botX: "Perl",
    botX_avt: "",
    botY: "Mika",
    botY_avt: "",
    startMsg: "Hello",
    hookURL: process.env.HOOK_URL
}

//Create first bot
botX = new cleverbot(config.user, config.key)
botX.setNick(config.botX)

//Create second bot
botY = new cleverbot(config.user, config.key)
botY.setNick(config.botY)

//Init both bots and send startMsg
botX.create((errX, sessionX) => {
    botY.create((errY, sessionY) => {
        post(config.botY, config.botY_avt, config.startMsg)
        askX(config.startMsg)
        console.log(config.botY + ":", config.startMsg)
    })
})

function askX(message) {
    try {
        botX.ask(message, (err, response) => {
            post(config.botX, config.botX_avt, response)
            askY(response)
            console.log(config.botX + ":", response)
        })
    } catch (e) { console.log("X - ", e) }
}

function askY(message) {
    try {
        botY.ask(message, (err, response) => {
            post(config.botY, config.botY_avt, response)
            askX(response)
            console.log(config.botY + ":", response)
        })
    } catch (e) { console.log("Y - ", e) }
}

function post(name, avatar, message) {
    let url = config.hookURL
    try {
        got.post(url, {
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "username": name,
                "avatar_url": avatar,
                "content": message
            },
            json: true
        })
    } catch (e) { console.log("POST - " + e) }
}