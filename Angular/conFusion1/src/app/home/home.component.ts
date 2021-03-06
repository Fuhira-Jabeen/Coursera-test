import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/Leader';
import { LeaderService } from '../services/leader.service';
import { expand, flyInOut } from '../animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  

  dish: Dish;
  promotion: Promotion;
  errMess : string;
  leadererrMess :string;
  promoerrMess: string;
  leader : Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice :LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish=>this.dish = dish,errmess => this.errMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion=>this.promotion = promotion,promoerrMess => this.promoerrMess = <any>promoerrMess);
    this.leaderservice.getFeaturedLeader().subscribe(leader=>this.leader = leader ,leadererrMess => this.leadererrMess = <any>leadererrMess);
  }

}
