import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { FormControl, FormGroup , Validators} from '@angular/forms';
@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  model:any={};
  show:boolean=false;
  show1:boolean=false;
  @Input() viewMode = false;
  @Input() currentTutorial: Tutorial = {
    category: '',
    name: '',
    rating:''
  };
  
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params["id"]);
    }
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

  getTutorial(id: string): void {
    this.tutorialService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTutorial = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateTutorial(): void {
    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tutorials']);
        },
        error: (e) => console.error(e)
      });
  }
  onClickSubmit(result:any){
    this.currentTutorial.name=result.name;
    this.currentTutorial.rating=result.rating;
    this.currentTutorial.category=result.category;
    this.updateTutorial();
  }
  onClickSubmit1(result:any){
    this.currentTutorial.name=result.name;
    this.currentTutorial.rating=result.rating;
    this.currentTutorial.category=result.category;
    this.deleteTutorial();
  }
}