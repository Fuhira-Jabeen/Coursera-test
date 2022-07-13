import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback,ContactType } from '../shared/feedback';
import { Observable } from 'rxjs';
import { map,catchError} from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http : HttpClient,private processHTTPMsgService: ProcessHTTPMsgService) { }



  SubmitFeedback(fb: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'ContentType':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback' , fb, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  
  }
}
