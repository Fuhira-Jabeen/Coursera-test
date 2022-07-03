import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/Leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  /*getLeaders(): Leader[] {
    return LEADERS;
  }

  getLeader(id: string): Leader {
    return LEADERS.filter((promo) => (promo.id === id))[0];
  }
  getFeaturedLeader(): Leader {
    return LEADERS.filter((promotion) => promotion.featured)[0];
  }*/

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

}
}