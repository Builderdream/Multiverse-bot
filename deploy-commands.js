require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
    new SlashCommandBuilder()
        .setName("triggertalking")
        .setDescription("Activate Multiverse-bot AI mode"),
    new SlashCommandBuilder()
        .setName("untriggertalking")
        .setDescription("Deactivate Multiverse-bot AI mode")
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log("Registering slash commands...");
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log("Slash commands registered.");
    } catch (err) {
        console.error(err);
    }
})();