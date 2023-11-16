// V3
class MessageBroker {
  constructor() {
    this.subscribers = [];
    this.currentTab = {};
    chrome.tabs.onCreated.addListener((tab) => {
      this.currentTab = tab;
      console.log('NEW TAB CREATED: ', tab);
    });
    chrome.tabs.onRemoved.addListener((tabId) => {
      this.removeSubscriber(tabId);
      console.log('REMOVED TAB: ', tabId);
      this.currentTab = {};
    });
  }
  init = (onMessage) => {
    console.log('INIT: ', onMessage);
    chrome.runtime.onConnect.addListener((port) => {
      const { name } = port;
      if (!this.currentTab.id) return;
      const { id = "" } = this.currentTab;
      const subscribers = this.subscribers;
      subscribers.push({ id, name, port });
      port.onMessage.addListener(onMessage);
      console.log('')
      port.onDisconnect.addListener(() => {
        this.removeSubscriber(id);
      });
    });
  };

  removeSubscriber = (id) => {
    const subscriptorIndexes = this.subscribers.reduce(
      (accumulator, subscriber, index) => {
        const match = subscriber.id === id;
        if (match) {
          accumulator.push(index);
        }
        return accumulator;
      },
      []
    );
    subscriptorIndexes.forEach((subscriptorIndex) =>
      this.subscribers.splice(subscriptorIndex, 1)
    );
  };

  notify = (name, message) => {
    chrome.tabs.query({ active: true }, (tabs) => {
      if (tabs) {
        const [tab] = tabs;
        this.currentTab = tab;
        const subscriptor = this.subscribers.find(
          (subscriber) => subscriber.id === tab.id && subscriber.name === name
        );
        subscriptor?.port?.postMessage?.(message);
      }
    });
  };
}

const broker = new MessageBroker();
broker.init((message) => {
  try {
    return broker.notify(message.port, message);
  } catch (error) {
    console.log(error);
    console.log(
      "Devtool has disconnected, please close and reopen the page to continue."
    );
  }
});
