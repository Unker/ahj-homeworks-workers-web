import { ajax } from 'rxjs/ajax';
import { interval, from } from 'rxjs';
import {
  switchMap, catchError, map, startWith,
} from 'rxjs/operators';

export default class Polling {
  constructor(url, container) {
    this.url = url;
    console.log(`server url ${url}`);
    this.container = container;

    this.messages = {};

    this.init();
    this.creatStream();
  }

  init() {
    const containerPolling = document.createElement('div');
    containerPolling.innerHTML = `
      <h1>Incoming</h1>
      <div class="polling-list"></div>
    `;

    this.pollingList = containerPolling.querySelector('.polling-list');

    this.container.appendChild(containerPolling);
  }

  creatStream() {
    // Создаем поток обновлений
    const polling$ = interval(5000)
      .pipe(
        startWith(0), // Для того, чтобы получить первые данные сразу при загрузке
        switchMap(() => ajax.getJSON(`${this.url}/messages/unread`).pipe(
          catchError((error) => {
            console.error('Ошибка при запросе:', error);
            return from([]); // Возвращаем пустой массив в случае ошибки
          }),
        )),
        map((response) => response.messages.reverse()), // чтобы добавлять сверху
      );

    // Подписываемся на поток обновлений и добавляем сообщения в "polling-list"
    polling$.subscribe((newMessages) => {
      newMessages.forEach((newMessage) => {
        this.messages[newMessage.id] = newMessage;
      });

      // Очищаем "polling-list" и добавляем сообщения
      this.pollingList.innerHTML = '';
      const sortedMessages = Object.values(this.messages).sort((a, b) => b.received - a.received);
      sortedMessages.forEach((message) => {
        const formattedDate = new Date(message.received * 1000).toLocaleString();
        const shortSubject = message.subject.length > 15
          ? `${message.subject.substring(0, 15)}...`
          : message.subject;

        const listItem = document.createElement('div');
        listItem.classList.add('polling-list-item');
        listItem.innerHTML = `
            <div class="message-info">
              <span class="message-email">${message.from}</span>
              <span class="message-subject">${shortSubject}</span>
              <span class="message-date">${formattedDate}</span>
            </div>
            `;

        this.pollingList.appendChild(listItem);
      });
    });
  }
}
