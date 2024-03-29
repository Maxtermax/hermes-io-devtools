class MessageBroker {
  init = () => {
    this.port = chrome.runtime.connect({ name: "content" });
    return this.port;
  };

  notify = (message) => {
    this.port.postMessage(message);
  };
}

const broker = new MessageBroker();

const port = broker.init();
port.onMessage.addListener(function handleMessageFromDevtools(event) {
  const { data = {} } = event;
  const { source = "", payload = "" } = data;
  if (source === "hermes-io-devtools") {
    if (payload === "GET_ORIGIN") {
      broker.notify({ source: "content", port: "panel", payload: window.location.origin }); // notify message from hermes-io.js to panel
      return;
    }
    window.postMessage({ ...data }, "*"); // send message to hermes-io.js
  }
});
console.log({ port });
port.onDisconnect.addListener(function handleDisconnection(event) {
  console.log('DISCONNECTED:', { event });
})

window.addEventListener(
  "message",
  function handleMessageFromHermesIO({ data = {} }) {
    console.log('MESAGE FROM HERMES: ', data);
    const { payload, type, source } = data;
    if (source === "hermes-io") {
      broker.notify({ port: "panel", type, payload, source }); // notify message from hermer-io.js to panel
    }
  }
);
