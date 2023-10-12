export default class PlaceholderNews {
  constructor(container) {
    this.containerNews = container;

    this.newsList = this.containerNews.querySelector('.news-list');

    this.render();
  }

  // удаление заглушки загрузки новостей
  removePlaceholder() {
    const elements = this.containerNews.getElementsByClassName('news-placeholder');
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  render() {
    const placeholder = document.createElement('div');
    placeholder.classList.add('news-placeholder');

    for (let i = 1; i <= 5; i += 1) {
      const listItem = document.createElement('div');
      listItem.classList.add('news-placeholder-item');
      listItem.innerHTML = `
        <div class="placeholder-head">
          <div class="animation-bar"></div>
        </div>
        <div class="placeholder-body">
          <div class="placeholder-img">
            <div class="animation-bar"></div>
          </div>
          <div class="placeholder-body-text">
            <div class="placeholder-bar">
              <div class="animation-bar"></div>
            </div>
            <div class="placeholder-bar">
              <div class="animation-bar"></div>
            </div>
          </div>
        </div>
      `;
      placeholder.appendChild(listItem);
    }
    this.newsList.appendChild(placeholder);
  }
}
