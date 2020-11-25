import { Component, OnInit } from '@angular/core';
import {constant,mergepdf} from '../../_services/constant'; 
import {ApiservicesService} from '../../_services/apiservices.service';
import { SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
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
 newValue = false;
 pdfErr = false;
 pdfErrMsg;
 srcs:any;
 urlSafe: SafeResourceUrl;

//  srcs = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  // {"section_type":"Select product information documents","mainsection_id":2,"main_modules":[]}
  // Select third-party data sheets
  newpdfdocs = [
  {"section_type":"","mainsection_id":"","main_modules":[]},
  {"section_type":"","mainsection_id":"","main_modules":[]}
]
uploadmainField = [{"unid":1,"name":"Cover letter"},{"unid":2,"name":"Budgetary quote"}]
// ,{"unid":5,"name":"PDF Document"},{"unid":6,"name":"PDF Document"}
uploadpdfField = [{"unid":3,"name":"Reference material"},{"unid":4,"name":"Drawing"}]
  constructor(private apiservices:ApiservicesService,public sanitizer:DomSanitizer) {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl('http://127.0.0.1:8080/1606304420514.6174file.pdf');
   }
 
  oninsertfield(){
  let newid_index = this.uploadpdfField.length -1;
  let newid = this.uploadpdfField[newid_index].unid;
    newid++;
    let fielddata = {
      "unid":newid,
      "name":"PDF Document"
    }
    this.uploadpdfField.push(fielddata);
    console.log('m new arr', this.uploadpdfField);
  }
  requiredInput(uniqueid,index,file){
  
    console.log('index',index,uniqueid);
    console.log('my array ++',this.pdfFiles.length);

 if(this.pdfFiles.length == 0){
  let uniquevalue = {
    id:uniqueid,
    filename:file
  }
  this.pdfFiles.push(uniquevalue);
  console.log('check one //',this.pdfFiles); 
 }else{
  let index = this.pdfFiles.findIndex(x => x.id === uniqueid);
  if( index === -1){
    let uniquevalue = {
      id:uniqueid,
      filename:file
    }
    this.pdfFiles.push(uniquevalue);
  }else{
    this.pdfFiles[index].filename = file;
  }
    console.log('find index new -1', index);
  }

   console.log('check final //',this.pdfFiles);  
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
    // let index = this.pdfFiles.findIndex(x => x.id === uniqueid);
    this.pdfErr = false;
    this.pdfFiles.length == 0 
    let coverletter =  this.pdfFiles.findIndex(x => x.id === 1);
    let budgetaryquote = this.pdfFiles.findIndex(x => x.id === 2);

    if ( this.pdfFiles.length == 0){ this.pdfErr = true; this.pdfErrMsg = "Please upload pdf file"; console.log('blank',this.pdfFiles);}
    else if(coverletter == -1 && budgetaryquote == -1){ this.pdfErr = true; this.pdfErrMsg = "Cover latter and Budgetary quote can not be blank"; console.log('select one',this.pdfFiles);}
    else if(coverletter == -1 ){this.pdfErr = true; this.pdfErrMsg = "Cover latter can not be blank"; console.log('select coverletter',this.pdfFiles); }
    else if(budgetaryquote == -1 ){this.pdfErr = true; this.pdfErrMsg = "Budgetary quote can not be blank"; console.log('select budgetaryquote',this.pdfFiles); }
    else{this.pdfErr = false; console.log('send data',this.pdfFiles); this.pdfErrMsg = "pdf merged successfully";
    var formData = new FormData(); 
    this.pdfFiles.map(value=>{
      console.log('files names',value.filename[0]);
      formData.append('pdffiles', value.filename[0]);
    })
    // formData.append('pdffiles', 'Chris');    
    this.apiservices.post(mergepdf,formData).subscribe((res:any)=>{
      console.log('merged data',res);
      this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl('http://127.0.0.1:8080/'+res.result);
     });
       }
   

  }
  ngOnInit(): void {
	this.apiservices.get(constant.pdf_modules).subscribe((res:any)=>{
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
