import { Component, OnInit } from '@angular/core';
import {constant,mergepdf,checkbox_url} from '../../_services/constant'; 
import {ApiservicesService} from '../../_services/apiservices.service';
import { SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-dr-airliquid',
  templateUrl: './dr-airliquid.component.html',
  styleUrls: ['./dr-airliquid.component.css']
})

export class DrAirliquidComponent implements OnInit {
//  coverLetter = null;
//  budgetaryQuote = null;
aside_covername = "cover Letter";
aside_budgetarname = "Budgetary quote"
 ModPdfs;
 pdfFiles = [];
 checkboxfiles = [];
 newValue = false;
 pdfErr = false;
 pdfErrMsg;
 srcs:any;
 urlSafe: SafeResourceUrl;
 isChecked : boolean;
 model: any = {};
 asideCross = true;
 slicify = () => {this.asideCross = !this.asideCross}
 removeAside(checkid,index){
  console.log('my index', checkid,index);
  this.checkboxfiles.splice(index,1);
 }
  // Select third-party data sheets
newpdfdocs = [
  {"section_type":"","mainsection_id":"","main_modules":[]},
  {"section_type":"","mainsection_id":"","main_modules":[]}
]

uploadmainField = [{"unid":1,"name":"Cover letter"},{"unid":2,"name":"Budgetary quote"}]
uploadpdfField = [{"unid":3,"name":"Reference material"},{"unid":4,"name":"Drawing"}]

  constructor(private apiservices:ApiservicesService,public sanitizer:DomSanitizer) {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(' https://eprocessdevelopment.com/Draeger/QPT/PDFS/FederalSignal/Federal Signal 27XST Strobe.pdf');
   }
   checkCheckBoxvalue(checkfilename,checkfoldername,checkid){
    let mainobject = {state: true,"mainid":checkid,"pdfname":checkfilename,"pdffullpath":checkbox_url+checkfoldername+'/'+checkfilename}
    let stateIndex =  this.checkboxfiles.findIndex(x => x.mainid === checkid);
    console.log('is checked', stateIndex);
    if(stateIndex == -1){
      console.log('not is checked', stateIndex);
      this.checkboxfiles.push(mainobject);
    }else{
      this.checkboxfiles.splice(stateIndex,1);
    }
    console.log('check box value', this.checkboxfiles);
   
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
    console.log('check file name',file[0].name);
  // for changing name of cover latter and budgetry quote on aside section 
  if(uniqueid == 1){this.aside_covername = file[0].name}
  else if(uniqueid == 2){this.aside_budgetarname = file[0].name}
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
    else {this.pdfErr = false; console.log('send data',this.pdfFiles); this.pdfErrMsg = "pdf merged successfully";
    
    var formData = new FormData(); 
    this.pdfFiles.map(value=>{
      console.log('files names',value.filename[0]);
      formData.append('pdffiles', value.filename[0]);
    })
    this.checkboxfiles.map(value=>{
      console.log('files names',value.pdffullpath);
      formData.append('pdfpath', value.pdffullpath);
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
