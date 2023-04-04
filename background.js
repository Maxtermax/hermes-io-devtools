class MessageBroker {
  constructor() {
    this.ports = {};
  }
  init = (onMessage) => {
    chrome.runtime.onConnect.addListener((port) => {
      const { name } = port;
      this.ports[name] = port;
      const ports = this.ports; 
      port.onMessage.addListener(onMessage);
      port.onDisconnect.addListener(function () {
        if (ports[name]) {
          delete ports[name];
        }
      });
    });
  };

  notify = (type, message) => {
    this.ports[type].postMessage(message);
  };
}

const broker = new MessageBroker();
broker.init((message) => {
  try {
    return broker.ports[message.port].postMessage(message);
  } catch (error) {
    console.log(error);
    console.log('Devtool has disconnected, please close and reopen the page to continue.');
  }
});
