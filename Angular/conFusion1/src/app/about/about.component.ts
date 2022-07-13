import { Component, OnInit,Inject } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut,expand } from '../animations/app.animations';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  
  leaders: Leader[];
  leadererrMess : string;

  constructor(private leaderService: LeaderService, @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {
    //this.dish = this.dishservice.getFeaturedDish();
   // this.leaders = this.leaderService.getLeaders();
   this.leaderService.getLeaders()
   .subscribe(leaders => this.leaders = leaders,leadererrMess => this.leadererrMess = <any>leadererrMess);
    
  }

}
