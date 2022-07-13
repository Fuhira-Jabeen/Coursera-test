import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/Leaders';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http : HttpClient,private processHTTPMsgService: ProcessHTTPMsgService) { }
  /*getLeaders(): Leader[] {
    return LEADERS;
  }

  getLeader(id: string): Leader {
    return LEADERS.filter((promo) => (promo.id === id))[0];
  }
  getFeaturedLeader(): Leader {
    return LEADERS.filter((promotion) => promotion.featured)[0];
  }

  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve =>{
      setTimeout(() => resolve(LEADERS), 2000);
        
      });
    }
  

  getLeader(id: string): Promise<Leader> {
    return new  Promise(resolve=> {
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]),2000);
  });
}

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve => {
    setTimeout(() => resolve(LEADERS.filter((leader) => (leader.featured))[0]),2000);
  });

}*/

getLeaders(): Observable<Leader[]> {
  //return of (LEADERS).pipe(delay(2000));
  return this.http.get<Leader[]>(baseURL+'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

getLeader(id: string): Observable<Leader> {
 // return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));   
 return this.http.get<Leader>(baseURL+'leadership/' +id)
 .pipe(catchError(this.processHTTPMsgService.handleError));
  
}

getFeaturedLeader(): Observable<Leader> {
  //return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  return this.http.get<Leader[]>(baseURL +'leadership?featured=true')
   .pipe(map(leader=>leader[0])) .pipe(catchError(this.processHTTPMsgService.handleError));
}
}