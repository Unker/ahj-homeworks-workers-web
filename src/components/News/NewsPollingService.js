import { ajax } from 'rxjs/ajax';
import { interval, throwError, from } from 'rxjs';
import {
  switchMap, catchError, map, startWith, timeout
} from 'rxjs/operators';

export default class NewsPollingService {
  constructor(url, pollingInterval = 60000, timeout = 100000) {
    this.url = url;
    this.newsList = {};
    this.pollingInterval = pollingInterval;
    this.timeout = timeout;
  }

  startPolling() {
    // Создаем поток обновлений
    return interval(this.pollingInterval).pipe(
      startWith(0),
      switchMap(() => ajax.getJSON(`${this.url}/news`).pipe(
        catchError((error) => {
          console.error('Ошибка при запросе:', error);
          return from([]); // Возвращаем пустой массив в случае ошибки
        }),
      )),
      map((response) => response.newsList.reverse()),
      timeout(this.timeout),
    ).pipe(
      catchError((error) => {
        console.error('Ошибка при запросе:', error);
        return throwError(error); // Генерируем исключение при ошибке
      })
    );
  }
}
