import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { switchMap } from 'rxjs/operators';
import { FormBuilder,FormControlDirective,FormGroup,FormGroupDirective,Validators } from '@angular/forms';
import { Comment } from '../shared/comment'; 
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm :FormGroup;
  comment :Comment;
  dishcopy :Dish;
  
  //errMess: string;

  @ViewChild('cform') commentFormDirective ;
  

  formErrors = {
    'author': '',
    'comment': ''
    
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,private cm: FormBuilder) {

      //this.createForm();
     }

  ngOnInit() {
   // const id = this.route.snapshot.params['id'];
    //this.dish = this.dishservice.getDish(id);
    //this.dishservice.getDish(id)
    //.subscribe(dish => this.dish= dish);
    this.createForm();
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    let now = new Date();
    this.comment.date = now.toISOString();
    console.log(this.comment);
    //this.dishcopy.comments.push(this.comment); 
    this.dish.comments.push(this.comment)
    //this.commentFormDirective.resetForm();
    
   
    /*this.commentForm.reset({
        author: '',
        rating: 5,
        comment: '',
        date: ''
    });*/
    this.commentFormDirective.resetForm();   
    this.commentForm.reset({
      rating :5,
      comment :'',
      author:'',        
      date :''
    });
    //this.commentFormDirective.resetForm();
    
    
  }
  createForm()
  {
    this.commentForm = this.cm.group({
      rating: 5,
      comment: ['',[Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],        
      date:''     
     });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
     this.onValueChanged(); // (re)set validation messages now


}
validationMessages = {
  'author': {
    'required':      'Author Name is required.',
    'minlength':     'Author Name must be at least 2 characters long.',
    'maxlength':     'Author Name cannot be more than 25 characters long.'
  },
  'comment': {
    'required':      'comment is required.'
    //'minlength':     'Last Name must be at least 2 characters long.',
    //'maxlength':     'Last Name cannot be more than 25 characters long.'
  },
  
};
onValueChanged(data?: any) {
  if (!this.commentForm) { return; }
  const form = this.commentForm;
  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}




}
