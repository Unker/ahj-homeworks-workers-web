export default class NewsUI {
  constructor(container, title, pollingService) {
    this.container = container;
    this.pollingService = pollingService;

    this.containerNews = document.createElement('div');
    this.containerNews.classList.add('news-container');
    this.containerNews.innerHTML = `
      <div class="news-container-title">${title}</div>
      <a class="news-refresh-btn">Обновить</a>
      <div class="news-list"></div>
    `;

    this.newsList = this.containerNews.querySelector('.news-list');
    this.container.appendChild(this.containerNews);

    this.pollingService.startPolling().subscribe(
      (newMessages) => {
        newMessages.forEach((newMessage) => {
          this.pollingService.newsList[newMessage.id] = newMessage;
        });

        this.updateUI();
      },
      (error) => {
        this.showModalNoConnection();
      },
    );
  }

  removeElementsByClass(className) {
    const elements = this.containerNews.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  updateUI() {
    this.newsList.innerHTML = '';
    this.removeElementsByClass('news-list-item');
    const sortedMessages = Object.values(this.pollingService.newsList).sort(
      (a, b) => a.posted - b.posted,
    );

    const n = Object.keys(sortedMessages).length;
    sortedMessages.slice(n - 5, n).forEach((message) => {
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
        <div class="message-head">
          <span class="message-subject">${shortSubject}</span>
          <span class="message-date">${formattedDate}</span>
        </div>
        <div class="message-info">
          <img class="message-img"></img>
          <span class="message-body">${shortBody}</span>
        </div>
        `;

      this.newsList.insertBefore(listItem, this.newsList.firstChild);
    });
  }

  showModalNoConnection() {
    const errorModal = document.createElement('div');
    errorModal.classList.add('error-connection-modal');
    errorModal.innerHTML = `
      <div class="error-modal-content">
        <span>Не удалось загрузить данные. Пожалуйста, проверьте подключение к сети и обновите страницу.</span>
      </div>
    `;

    this.containerNews.appendChild(errorModal);
  }
}
