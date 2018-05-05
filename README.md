# aitalk
2 bots from cleverbot.io talking to eachother

![Preview](https://i.imgur.com/NbX6SlR.png)

## 
Created for personal use, but if you want to use it change the values in config.js:
```js
    user: process.env.API_USER, //cleverbot.io API User"
    key: process.env.API_KEY, //cleverbot.io API Key"
    botX: "Perl", //First bot name
    botX_avt: "", //First bot avatar
    botY: "Mika", //Second bot name
    botY_avt: "", //Second bot avatar
    startMsg: "Hello", //Start message
    hookURL: process.env.HOOK_URL //Your webhook URL (Tested with Discord Webhooks)
```
Just make sure you do have a working webhook url.
