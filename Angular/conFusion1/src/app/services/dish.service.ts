import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import {Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map } from 'rxjs/operators';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http : HttpClient) { }
/*getDishes(): Dish[]{
  return DISHES;
}
  getDish(id: string): Dish {
    return DISHES.filter((dish) => (dish.id === id))[0];
  }

  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }
*/
//implementing promises
/*getDishes(): Promise<Dish[]> {
  return Promise.resolve(DISHES);
}

getDish(id: string): Promise<Dish> {
  return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
}

getFeaturedDish(): Promise<Dish> {
  return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
}

getDishes(): Promise<Dish[]> {
  return new Promise(resolve=> {
    // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES), 2000);
  });
}*/

getDishes(): Observable<Dish[]> {
  //return of (DISHES).pipe(delay(2000));
  return this.http.get<Dish[]>(baseURL+'dishes');
}

getDish(id: string): Observable<Dish> {
  //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));   
  return this.http.get<Dish>(baseURL+'dishes/' +id);
  
}

getFeaturedDish(): Observable<Dish> {
  //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  return this.http.get<Dish[]>(baseURL +'dishes?featured=true').pipe(map(dishes=>dishes[0]));
}
getDishIds(): Observable<string[] | any> {
//  return of(DISHES.map(dish => dish.id ));
return this.getDishes().pipe(map(dishes=>dishes.map(dish => dish.id)));
}

}
