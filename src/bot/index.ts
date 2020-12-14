import { Ban, User } from "../db";
import { ApiClient, StaticAuthProvider } from "twitch";
import { ChatClient } from "twitch-chat-client";

async function getUsers() {
  const users = await User.find().exec();

  for (const user of users) {
    const authProvider = new StaticAuthProvider(
      process.env.CLIENT_ID,
      user.access_token
    );
    const api = new ApiClient({ authProvider });
    const current_bans = await api.helix.moderation.getBannedUsers(
      user.twitch_id
    );
    for (const ban of current_bans.data) {
      await Ban.updateOne(
        { twitch_id: ban.userId },
        { $set: { twitch_id: ban.userId, twitch_name: ban.userName } },
        { upsert: true }
      ).exec();
    }
    const chatClient = new ChatClient(authProvider, {
      channels: [user.twitch_name],
    });
    chatClient.onBan(async (_channel, username) => {
      const ban = await api.helix.users.getUserByName(username);
      await Ban.updateOne(
        { twitch_id: ban.id },
        { $set: { twitch_id: ban.id, twitch_name: ban.displayName } },
        { upsert: true }
      ).exec();
    });
    await chatClient.connect();
  }
}
(async () => {
  // Get the users
  await getUsers();

  // Populate the ban list
  // Connect to chats
  // Add bans to channels
})();
