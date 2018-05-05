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
        post(botY, botY_avt, config.startMsg);
        askX(config.startMsg);
        console.log(config.botY + ":", config.startMsg)
    })
})

function askX(message) {
    try {
        botX.ask(message, (err, response) => {
            post(botX, botX_avt, response);
            askY(response)
            console.log(config.botX + ":", response)
        })
    } catch (e) { console.log("X - ", e) }
}

function askY(message) {
    try {
        botY.ask(message, (err, response) => {
            post(botY, botY_avt, response);
            askX(response)
            console.log(config.botY + ":", response)
        })
    } catch (e) { console.log("Y - ", e) }
}

function post(name, avatar, message) {
    let url = "https://discordapp.com/api/webhooks/442304255966052362/WR3qf_fRktB3amQ1LM5dVqV-yBOXpQ3beLi_fdPVgOZSDOwiKZG8VKlcWMw625inZ11x"
    try {
        got.post(url, {
            headers: {
                "Content-Type": "application/json"
            },
            form: {
                "username": name,
                "avatar_url": avatar,
                "content": message
            },
            json: true
        })
    } catch (e) { console.log("POST - " + e) }
}