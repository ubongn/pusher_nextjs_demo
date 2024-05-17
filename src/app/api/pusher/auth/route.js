import { getPusherInstance } from "@/libs/pusher/server";

const pusherServer = getPusherInstance();

export async function POST(req) {
  console.log("authenticating pusher perms...")
  const data = await req.text();
  const [socketId, channelName] = data.split("&").map(str => str.split("=")[1]);

  // logic to check user permissions (implement your logic here)

  const authResponse = pusherServer.authorizeChannel(socketId, channelName);

  return new Response(JSON.stringify(authResponse));
}
