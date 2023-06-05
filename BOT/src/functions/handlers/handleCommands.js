const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
require("dotenv").config;

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        try {
          commandArray.push(command.data.toJSON());
        } catch (error) {
          console.error(error);
        }
      }
    }

    const clientID = "1114568020589821982";
    const guildID = "1114193223129247836";
    const rest = new REST({ version: "10" }).setToken(process.env.token);
    try {
      console.log("Started refreshing application(/) commands.");

      try {
        await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
          body: client.commandArray,
        });
      } catch (error) {
        console.error(error);
      }

      console.log("Succesfully refreshed application(/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
