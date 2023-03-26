let panelWindow;

class MessageBroker {
  init = (onMessage) => {
    this.port = chrome.runtime.connect({ name: "panel" });
    this.port.onMessage.addListener(onMessage);
  };

  notify(message) {
    try {
      this.port.postMessage(message);
    } catch (error) {
      console.log(error);
      alert(
        "Devtool has disconnected, please close and reopen the page to continue."
      );
    }
  }
}

const actions = {
  context: (message = {}) => {
    // console.log("panel.js context: ", message);
  },
};

function initializatedPanel(panel) {
  const broker = new MessageBroker();
  broker.init((event = {}) => {
    panelWindow?.postMessage?.(event, "*"); // notify message from panel to layout
  });
  panel.onShown.addListener((extPanelWindow) => {
    extPanelWindow.onmessage = (event) =>
      broker.notify({ port: "content", data: event.data });
    panelWindow = extPanelWindow;
  });
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  // console.log('tabs: ', tabs);
});

chrome.devtools.panels.create(
  "Hermes",
  "build/assets/images/icon_128.png",
  "build/index.html",
  initializatedPanel
);
