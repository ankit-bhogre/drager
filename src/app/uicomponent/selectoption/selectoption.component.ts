import { Component, OnInit } from '@angular/core';
import {ApiservicesService} from '../../_services/apiservices.service';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-selectoption',
  templateUrl: './selectoption.component.html',
  styleUrls: ['./selectoption.component.css']
})
export class SelectoptionComponent implements OnInit {
  submitted = false;
  newQuote:FormGroup;
  
  // below arry will show api data list
  existQuotes = ['AdvnSix-PA0252020','AdvnSix-PA0252021','AdvnSix-PA0252022','AdvnSix-PA0252023','AdvnSix-PA0252024'];
  excerpt: Array<any> = []; // this array used for toggle selected item
  constructor(private fb:FormBuilder,private apiservice:ApiservicesService,private router: Router) { }
  ngOnInit(): void {
   this.newQuote = this.fb.group({
      quotename:['',[Validators.required]]
    })
  }
  get quotevalidate(){return this.newQuote.controls}
 slicify = (i) => {
                  this.excerpt[i] = !this.excerpt[i];
                  this.excerpt.map((value,index)=>{ if(index != i){this.excerpt[index] = false;} })
                  if(this.excerpt[i] == true){ this.apiservice.sharePdf(this.existQuotes[i]);}
                  }


 selectQuote(){
  this.submitted = true;
  if( this.newQuote.invalid){  console.log('entered',this.newQuote.value);return}
  if(this.excerpt.indexOf(true) == -1){ this.apiservice.sharePdf(this.newQuote.value.quotename)}
  else{console.log('please uncheck selected name')}
 this.router.navigate(['/mergepdf']);
  //  console.log('form submitted',this.newQuote.value)
  }
  selectexistQuote(){ 
    if(this.excerpt.indexOf(true) != -1){  this.router.navigate(['/mergepdf']); console.log('check val', this.excerpt.indexOf(true)) }
    // console.log('check val', this.excerpt.indexOf(true)) 
  }
}
