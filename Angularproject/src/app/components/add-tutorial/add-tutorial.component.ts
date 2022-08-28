import { Component } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { FormControl, FormGroup , Validators} from '@angular/forms';
@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent {
  model:any={};
  show:boolean=false;
  show1:boolean=false;
  select1='--Select--';
  tutorial: Tutorial = {
    category: '',
    name: '',
    rating:''
  };
  submitted = false;

  constructor(private tutorialService: TutorialService) { }
  ngOnInit() {
    this.model = new FormGroup({
      'name': new FormControl(this.model.name,
        [Validators.required,Validators.pattern("^[a-zA-Z0-9]{10}$")]),
      'rating': new FormControl(this.model.rating,
        [Validators.required,]),
        'category': new FormControl(this.model.category,
          [Validators.required,]),
    });
  }
  

  keyPressNumbers(event:any) {
    var c:number= + event.target.value;
    if ((c < 0 || c > 5)) {
      this.show=true;
    } else {
      this.show=false;
    }
  }
  keyPressAlphanumeric(event:any) {

    var inp = event.target.value;

    if (/^[a-zA-Z0-9_]*$/.test(inp)) {
      this.show1=false;
    } else {
      this.show1=true;
    }
  }

  saveTutorial(): void {
    const data = {
      category: this.tutorial.category,
      name: this.tutorial.name,
      rating:this.tutorial.rating
    };
 console.log(data)
 this.tutorialService.create(data)
 .subscribe({
   next: (res) => {
     console.log(res);
     this.submitted = true;
   },
   error: (e) => console.error(e)
 });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      category: '',
      name: '',
      rating:''
    };
  }
onClickSubmit(result:any){
  this.tutorial.name=result.name;
  this.tutorial.rating=result.rating;
  this.tutorial.category=result.category;
  this.saveTutorial();
}
}