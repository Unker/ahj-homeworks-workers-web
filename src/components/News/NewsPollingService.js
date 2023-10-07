import { ajax } from 'rxjs/ajax';
import { interval, from } from 'rxjs';
import {
  switchMap, catchError, map, startWith,
} from 'rxjs/operators';

export default class NewsPollingService {
  constructor(url) {
    this.url = url;
    this.newsList = {};
  }

  startPolling() {
    // Создаем поток обновлений
    return interval(10000).pipe(
      startWith(0),
      switchMap(() => ajax.getJSON(`${this.url}/news`).pipe(
        catchError((error) => {
          console.error('Ошибка при запросе:', error);
          return from([]); // Возвращаем пустой массив в случае ошибки
        }),
      )),
      map((response) => response.newsList.reverse()),
    );
  }
}
