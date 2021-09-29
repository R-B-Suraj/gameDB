import { Component, OnInit } from '@angular/core';

// imports 
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // onSubmit is accepting a form of type NgForm...
  // using the aboves router to navigate to a search page  from 
  // the form we extract the value of input search whose name is search
  onSubmit(form: NgForm){
    this.router.navigate(['search',form.value.search])
  }

}
