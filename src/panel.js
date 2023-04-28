let panelWindow;

class MessageBroker {
  setup = (onMessage) => {
    this.port = chrome.runtime.connect({ name: "panel" });
    this.port.onMessage.addListener(onMessage);
  };
  init = (onMessage) => {
    this.setup(onMessage);
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

chrome.devtools.panels.create(
  "Hermes",
  "build/assets/images/icon_128.png",
  "build/index.html",
  initializatedPanel
);
