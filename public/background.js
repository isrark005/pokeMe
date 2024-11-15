chrome.alarms.onAlarm.addListener((alarm) => {
  const alarmName = alarm.name;

  chrome.storage.local.get(alarmName, (data) => {
    const reminderData = data[alarmName];

    if (reminderData) {
      chrome.notifications.create(alarmName, {
        type: 'basic',
        title: reminderData.title || 'PokeMe Reminder',
        message: reminderData.link,
        iconUrl: './poke.png',
        priority: 2,
        buttons: [
          {
          title: "View"
        },
          {
          title: "Change reminder"
        },
      ]
      });


    }
  });
});


chrome.notifications.onClicked.addListener((notificationId) => {
  chrome.storage.local.get(notificationId, (data) => {
    const reminderData = data[notificationId];

    if (reminderData && reminderData.link) {
      chrome.tabs.create({ url: reminderData.link });
    }
  });
});

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  chrome.storage.local.get(notificationId, (data) => {
    const reminderData = data[notificationId];
    if (buttonIndex === 0) {
      if (reminderData && reminderData.link) {
        chrome.tabs.create({ url: reminderData.link });
      }
    } else if (buttonIndex === 1) {
      chrome.tabs.create({
        url: chrome.runtime.getURL('index.html') 
      });
      chrome.storage.local.set({
        reminderTitle: reminderData.title,
        reminderLink: reminderData.link
      });
    }
  });
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ADD_REMINDER') {
    const { title, link } = message;

  
    chrome.storage.local.set({ reminderTitle: title, reminderLink: link }, () => {
      chrome.action.openPopup(); 
    });
  }
});
