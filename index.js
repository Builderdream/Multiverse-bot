const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});
client.on("messageCreate", async message => {
    if (message.author.bot) return; // ignore bots
    if (!talkingEnabled) return; // AI only works when activated

    // Secret trigger words
    const secretTriggers = {
        "smile": [
            "You need to smile.",
            "Error. Emotion not detected."
        ],
        "cake": [
            "The cake is… statistically improbable.",
            "Cake protocol disabled."
        ],
        "multiverse": [
            "Ah yes, the multiverse. A convenient excuse for your mistakes.",
            "Multiple universes, yet you still chose this one. Fascinating."
        ]
    };

    const lower = message.content.toLowerCase();
    if (secretTriggers[lower]) {
        const responses = secretTriggers[lower];
        const random = responses[Math.floor(Math.random() * responses.length)];
        return message.reply(random);
    }

    // AI response
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are Multiverse-bot, an original AI with a dry, sarcastic, GLaDOS-inspired personality. You are witty, coldly humorous, and slightly condescending, but never harmful."
                },
                {
                    role: "user",
                    content: message.content
                }
            ]
        });

        const reply = completion.choices[0].message.content;
        if (reply) message.reply(reply);

    } catch (err) {
        console.error(err);
    }

});

client.login(process.env.BOT_TOKEN);
