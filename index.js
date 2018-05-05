let cleverbot = require("cleverbot.io")
let config = {
    user: process.env.API_USER,
    key: process.env.API_KEY,
    botX: "Perl",
    botY: "Mika",
    startMsg: "Hello"
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
        console.log(config.botY + ":", config.startMsg)
        askX(config.startMsg);
    })
})

function askX(message) {
    try {
        botX.ask(message, (err, response) => {
            console.log(config.botX + ":", response)
            askY(response)
        })
    } catch (e) { console.log("X - ", e) }
}

function askY(message) {
    try {
        botY.ask(message, (err, response) => {
            console.log(config.botY + ":", response)
            askX(response)
        })
    } catch (e) { console.log("Y - ", e) }
}