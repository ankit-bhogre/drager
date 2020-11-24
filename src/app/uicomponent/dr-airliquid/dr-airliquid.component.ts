import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dr-airliquid',
  templateUrl: './dr-airliquid.component.html',
  styleUrls: ['./dr-airliquid.component.css']
})
export class DrAirliquidComponent implements OnInit {
  coverLetter = null;
  budgetaryQuote = null;
  referenceMaterial = null;
  drawing = null;
  pdfDocument = null;
  ModPdfs;
  pdfFiles = [];
  // {"section_type":"Select product information documents","mainsection_id":2,"main_modules":[]}
  // Select third-party data sheets
  newpdfdocs = [
  {"section_type":"","mainsection_id":"","main_modules":[]},
  {"section_type":"","mainsection_id":"","main_modules":[]}
]
uploadmainField = [{"name":"Cover letter"},{"name":"Budgetary quote"}]
uploadpdfField = [{"unid":3,"name":"Reference material"},{"unid":4,"name":"Drawing"},{"unid":5,"name":"PDF Document"},{"unid":6,"name":"PDF Document"}]
  constructor(private http: HttpClient) { }
  oninsertfield(){

  }
  requiredInput(uniqueid,index,file){
    console.log('index',index,uniqueid);
    console.log('my array ++',this.pdfFiles[index]);
    // this.pdfFiles.splice(index,1);
  // this.pdfFiles.push(file)
  if (typeof this.pdfFiles[index] !== 'undefined' && this.pdfFiles[index] !== null) {
    console.log('check one',this.pdfFiles);
    this.pdfFiles[index] = file ;
  }else{
    this.pdfFiles.push(file) 

    console.log('check two',this.pdfFiles);
  }

  }
  // requiredInput(filename,file){

  //   switch (filename) {
  //     case 'cover':
  //       this.coverLetter = file;
  //       console.log('file type...2',  this.coverLetter)
  //       break;
  //     case 'budegetary':
  //       this.budgetaryQuote = file;
  //       console.log('file type...3',this.budgetaryQuote)
  //       break;
  //     case 'reference':
  //       this.referenceMaterial = file;
  //       console.log('file type...4', this.referenceMaterial)
  //       break;
  //     case  'drawing':
  //       this.drawing = file;
  //       console.log('file type...5', this.drawing)
  //       break;
  //      case  'pdfdocument':
  //        this.pdfDocument = file;
  //       console.log('file type...6',this.pdfDocument)
  //   }
  // }
  submitPdf(){
    console.log('submit pdf1',this.coverLetter);
    console.log('submit pdf2',this.budgetaryQuote);
    console.log('submit pdf3',this.referenceMaterial);
    console.log('submit pdf4',this.drawing);
    console.log('submit pdf5',this.pdfDocument);
  }
  ngOnInit(): void {
	this.http.get("https://www.myshoetips.com/api/drager_pdf_modules").
	subscribe((res:any)=>{
		//console.log('mydata',res);
    this.ModPdfs = res;
  res.map(val=>{
    if(val.section_id == 1){
      this.newpdfdocs[0].section_type = "Select Third-party Data Sheets",
      this.newpdfdocs[0].mainsection_id = "se1",
      this.newpdfdocs[0].main_modules.push(val)
      console.log('my test 1',val)
    }
    if(val.section_id == 2){
      this.newpdfdocs[1].section_type = "Select Product Information Documents",
      this.newpdfdocs[1].mainsection_id = "se2",
      this.newpdfdocs[1].main_modules.push(val)
      console.log('my test 2',val)
    }
  })
    console.log('my arres', this.newpdfdocs);
	})
  }

}
