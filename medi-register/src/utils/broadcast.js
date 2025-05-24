let channel;

export const getChannel = () => {
  if (!channel) {
    channel = new BroadcastChannel("mediregister-sync");
  }
  return channel;
};

export const broadcastUpdate = () => {
  getChannel().postMessage({ type: "update" });
};

export const subscribeToUpdate = (callback) => {
  const ch = getChannel();
  console.log("Subscribed to BroadcastChannel updates");
  ch.onmessage = (event) => {
    console.log("BroadcastChannel received event:", event);
    if (event.data?.type === "update") {
      console.log("Executing sync callback...");
      callback();
    }
  };
};
