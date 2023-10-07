export default class NewsUI {
  constructor(container, title, pollingService) {
    this.container = container;
    this.pollingService = pollingService;

    const containerNews = document.createElement('div');
    containerNews.classList.add('news-container');
    containerNews.innerHTML = `
      <div class="news-container-title">${title}</div>
      <a class="news-refresh-btn">Обновить</a>
      <div class="news-list"></div>
    `;

    this.newsList = containerNews.querySelector('.news-list');
    this.container.appendChild(containerNews);

    this.pollingService.startPolling().subscribe((newMessages) => {
      // debugger;
      newMessages.forEach((newMessage) => {
        this.pollingService.newsList[newMessage.id] = newMessage;
      });

      this.updateUI();
    });
  }

  updateUI() {
    this.newsList.innerHTML = '';
    const sortedMessages = Object.values(this.pollingService.newsList).sort(
      (a, b) => b.received - a.received,
    );

    sortedMessages.forEach((message) => {
      const formattedDate = new Date(message.posted * 1000).toLocaleString();
      const shortSubject = message.subject.length > 30
        ? `${message.subject.substring(0, 30)}...`
        : message.subject;
      const shortBody = message.body.length > 150
        ? `${message.body.substring(0, 150)}...`
        : message.body;

      const listItem = document.createElement('div');
      listItem.classList.add('news-list-item');
      listItem.innerHTML = `
        <div class="message-title">
          <span class="message-subject">${shortSubject}</span>
          <span class="message-date">${formattedDate}</span>
        </div>
        <div class="message-info">
          <img class="message-img"></img>
          <span class="message-body">${shortBody}</span>
        </div>
        `;

      // this.newsList.appendChild(listItem);
      this.newsList.insertBefore(listItem, this.newsList.firstChild);
    });
  }
}
