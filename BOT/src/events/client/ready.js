module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`The bot has logged in with the ID: ${client.user.tag}`);
  },
};
