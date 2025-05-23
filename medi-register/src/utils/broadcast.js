const channel = new BroadcastChannel("mediregister-sync");

export const broadcastUpdate = () => {
  channel.postMessage({ type: "update" });
};

export const subscribeToUpdate = (callback) => {
  channel.onmessage = (event) => {
    if (event.data?.type === "update") {
      callback();
    }
  };
};
