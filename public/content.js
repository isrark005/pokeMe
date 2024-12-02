function addButtonToVideoCards(selector, buttonText, className) {
    const videoCards = document.querySelectorAll(selector);
  
    videoCards.forEach((item) => {
      if (item.querySelector(`.${className}`)) return;
  
      const button = document.createElement('button');
      button.innerText = buttonText;
      button.className = className;
      button.style.position = 'absolute';
      button.style.bottom = '10px';
      button.style.left = '10px';
      button.style.padding = '5px 10px';
      button.style.backgroundColor = '#000000';
      button.style.color = '#fff';
      button.style.border = 'none';
      button.style.borderRadius = '3px';
      button.style.cursor = 'pointer';
      button.style.zIndex = '1000';
  
      const thumbnailContainer = item.querySelector('ytd-thumbnail');
      if (thumbnailContainer) {
        thumbnailContainer.style.position = 'relative';
        thumbnailContainer.appendChild(button);
      }
  
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
  
        const videoLink = item.querySelector('a#thumbnail')?.href;
        const videoTitle = item.querySelector('#video-title')?.textContent.trim();
  
        if (videoLink && videoTitle) {
          chrome.runtime.sendMessage({ type: 'ADD_REMINDER', title: videoTitle, link: videoLink });
        }
      });
    });
  }
  
  function addButtonsToAllVideoCards() {
    addButtonToVideoCards('ytd-rich-item-renderer', 'PokeMe', 'pokeMeButton');
    addButtonToVideoCards('ytd-compact-video-renderer', '🕒', 'pokeMeClockButton');
    addButtonToVideoCards('ytd-video-renderer', 'Set Reminder', 'pokeMeButton');
    addButtonToVideoCards('ytd-grid-video-renderer', 'Set Reminder', 'pokeMeButton');
    addButtonToVideoCards('ytd-playlist-video-renderer', 'Set Reminder', 'pokeMeButton');
    addButtonToVideoCards('ytd-movie-renderer', 'Set Reminder', 'pokeMeButton');
  }
  
  // Run the function initially and observe changes
  addButtonsToAllVideoCards();
  const observer = new MutationObserver(addButtonsToAllVideoCards);
  observer.observe(document.body, { childList: true, subtree: true });
  