import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http : HttpClient,private processHTTPMsgService: ProcessHTTPMsgService) { }
  /*getPromotions(): Promotion[] {
    return PROMOTIONS;
  }

  getPromotion(id: string): Promotion {
    return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }
  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  }*/

  getPromotions(): Observable<Promotion[]> {
    //return of (PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL+'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    //return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
   return this.http.get<Promotion>(baseURL+'promotions/' +id)
   .pipe(catchError(this.processHTTPMsgService.handleError));
  
  }
  getFeaturedPromotion(): Observable<Promotion> {
   // return of (PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
   return this.http.get<Promotion[]>(baseURL +'promotions?featured=true')
   .pipe(map(promotion=>promotion[0])) .pipe(catchError(this.processHTTPMsgService.handleError));

    
  }

}
