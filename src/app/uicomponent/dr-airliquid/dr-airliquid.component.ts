import { Component, OnInit,ViewChild,ElementRef ,ViewChildren,QueryList} from '@angular/core';
import {constant,upload,mergepdf,checkbox_url} from '../../_services/constant'; 
import {ApiservicesService} from '../../_services/apiservices.service';
import { SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Router, ActivatedRoute} from '@angular/router'
import * as $ from 'jquery'; 
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
asideReference = "";
asideDrawing = "";
disabletab = false;
 ModPdfs;
 pdfFiles = [];
 checkboxfiles = [];
 asidename = [];
 newValue = false;
 pdfErr = false;
 pdfErrMsg;
 srcs:any;
 urlSafe: SafeResourceUrl;
 isChecked : boolean;
 model: any = {};
 asideCross = true;
 mainfiles = [] // get
 slicify = () => {this.asideCross = !this.asideCross}
arraySeq = [];
isMarged = false;
hitMergeApi = true;
previreloader = true;
isProcess = false;
storeUploadpdf = [];
userId;
quoteId;
//  *********************************************************

onDrop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data,
      event.previousIndex,
      event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex, event.currentIndex);
  }
  console.log('mytodo',this.pdfFiles)
}
// ***********************************************************

/** Get handle on cmp tags in the template */
@ViewChildren('optionalinputFile') myInputVariable:QueryList<any>;
@ViewChildren('documentinputFile') docInputVariable:QueryList<any>;
 removeAside(checkid,index,identifyname){
  if(identifyname == "optionalpdf"){
       if(checkid >2){
        let uploadinpdfIndex = this.uploadpdfField.findIndex(x=>x.unid == checkid);
        console.log('insider testing', this.uploadpdfField.findIndex(x=>x.unid == checkid));
        this.myInputVariable.toArray()[uploadinpdfIndex].nativeElement.value = '';
  
         this.pdfFiles.splice(index,1);
       }
  }
  if(identifyname == "checkbox"){
    console.log('my index 0000000', this.pdfFiles[index].mainid);
    $('#tid'+this.pdfFiles[index].mainid).trigger('click');
  }
 }
  // Select third-party data sheets
newpdfdocs = [
  {"section_type":"","mainsection_id":"","main_modules":[]},
  {"section_type":"","mainsection_id":"","main_modules":[]}
]

uploadmainField = [{"unid":1,"name":"Cover letter"},{"unid":2,"name":"Budgetary quote"}]
uploadpdfField  = [{"unid":3,"name":"Reference material"},{"unid":4,"name":"Drawing"}]

  constructor(private apiservices:ApiservicesService,public sanitizer:DomSanitizer,private activatedRoute: ActivatedRoute) {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(' ');
  }
 
   checkCheckBoxvalue(pdf_id,pdf_type,checkfilename,checkfoldername,checkid){
    console.log('my check box ++', pdf_id,pdf_type,checkfilename,checkfoldername,checkid);
    let mainobject = {state: true,"mainid":checkid,"original_pdf_name":checkfilename,"pdffullpath":checkbox_url+checkfoldername+'/'+checkfilename,"pdf_id":pdf_id,"pdf_type":pdf_type}
    let stateIndex =  this.pdfFiles.findIndex(x => x.mainid === checkid);
    console.log('is checked', stateIndex);
    if(stateIndex == -1){
      console.log('not is checked', stateIndex);
      this.pdfFiles.push(mainobject);
    }else{
      this.pdfFiles.splice(stateIndex,1);
    }
    console.log('check box value', this.pdfFiles);
   
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


  // for uploading pdf "Upload PDF document" section
  requiredInput(uniqueid,index,file){
    console.log('check file name *-*',uniqueid,file[0]);
    if(file[0] === undefined){ 
     this.pdfFiles.map((val,index)=>{

      if(val.id && (val.id == 1)){
        this.aside_covername = "cover Letter";
      }else if(val.id && (val.id == 2)){
        this.aside_budgetarname = "Budgetary quote"
      }

      if(val.id && (val.id == uniqueid)){
        this.pdfFiles.splice(index,1)
      }
    })
    console.log('check file undefined *-**' ,this.pdfFiles); 
  }else{
  // for changing name of cover latter and budgetry quote on aside section 
  this.asidename.push(file[0].name);
  if(uniqueid == 1){this.aside_covername = file[0].name}
  else if(uniqueid == 2){this.aside_budgetarname = file[0].name}
 if(this.pdfFiles.length == 0){
  let uniquevalue = {
    id:uniqueid,
    filename:file,
    pdf_name:"",
    pdf_type:"",
    pdf_id:""
  }
  this.pdfFiles.push(uniquevalue);
  console.log('check one //',this.pdfFiles); 
 }else{
  let index = this.pdfFiles.findIndex(x => x.id === uniqueid);
  if( index === -1){
    let uniquevalue = {
      id:uniqueid,
      filename:file,
      pdf_name:"",
      pdf_type:"",
      pdf_id:""
    }
    this.pdfFiles.push(uniquevalue);
  }else{
    this.pdfFiles[index].filename = file;
  }
      }
    }
  }


   arraymove(arr, fromIndex, toIndex) {
    var element =  this.pdfFiles[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

  submitPdf(){
  
    this.isMarged = true;
    // let index = this.pdfFiles.findIndex(x => x.id === uniqueid);
    this.pdfErr = false;
    this.pdfFiles.length == 0; 
    let coverletter =  this.pdfFiles.findIndex(x => x.id === 1);
    let budgetaryquote = this.pdfFiles.findIndex(x => x.id === 2);

    if ( this.pdfFiles.length == 0){ this.pdfErr = true; this.pdfErrMsg = "Please upload required pdf file";  this.isMarged = false; console.log('blank',this.pdfFiles);}
    else if(coverletter == -1 && budgetaryquote == -1){ this.pdfErr = true; this.pdfErrMsg = "Cover latter and Budgetary quote can not be blank"; this.isMarged = false; console.log('select one',this.pdfFiles);}
    else if(coverletter == -1 ){this.pdfErr = true; this.pdfErrMsg = "Cover latter can not be blank"; this.isMarged = false; console.log('select coverletter',this.pdfFiles); }
    else if(budgetaryquote == -1 ){this.pdfErr = true; this.pdfErrMsg = "Budgetary quote can not be blank"; this.isMarged = false; console.log('select budgetaryquote',this.pdfFiles); }
    else {
      // used function for arrange coverletter and budgetaryquote on o and 1 index 
      this.arraymove(this.pdfFiles,coverletter,0);
      this.arraymove(this.pdfFiles,budgetaryquote,1);
   
      // ========================
      this.pdfErr = false; 
      this.arraySeq = [];
      let arrayUrl = [];
      var formData = new FormData(); 

  
      formData.append('user_id', this.userId);
      formData.append('quote_id',this.quoteId);
      let testindexid = []
      this.pdfFiles.map((val,index)=>{
       
      if(val.filename){ 
        if(val.id == 1){  
        testindexid.push(index)
        formData.append('fd_cover_letter', val.filename[0]);
           }
        else if(val.id == 2){
          testindexid.push(index)
          formData.append('fd_price', val.filename[0]);
          }
          else if(val.id > 2){
             var otherpdf = []
             otherpdf.push(val.filename[0])
             testindexid.push(index)
            formData.append('pdf_file[]', val.filename[0])
          }
       }
      });

 
      this.apiservices.post(constant.submitpdf,formData).subscribe((res:any)=>{
        if(res && res[0].status == true){
          testindexid.map((val,index)=>{ 
            this.pdfFiles[val].pdf_name =  res[0].pdf_data[index].pdf_name;
            this.pdfFiles[val].pdf_type =  res[0].pdf_data[index].pdf_type;
            this.pdfFiles[val].pdf_id  =  res[0].pdf_data[index].pdf_id;
           })
            
            this.isMarged = false;
            this.isProcess = false;
            this.hitMergeApi = false;
            this.disabletab = false;
         }
        
       });
       }
    }
 // this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl('http://127.0.0.1:8080/'+res.result);
    switchTab(){
      if(this.hitMergeApi == false){
           this.previreloader = true;
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(' ');
          
        let sortedarray = []
        this.pdfFiles.map(val=>{
          sortedarray.push({"pdf_type":val.pdf_type,"pdf_id":val.pdf_id})
        })
      
        console.log('final arrya is :-',sortedarray)
       

        var formData = new FormData(); 
        formData.append('user_id',this.userId);
        formData.append('quote_id',this.quoteId);
        formData.append('pdfs_data', JSON.stringify(sortedarray));
 
        
        this.apiservices.post(constant.mergepdf,formData).subscribe((res:any)=>{
         console.log('merged final data ----',res);
         if(res && res.status == true){
         this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(res.pdf_preview_link);
         this.hitMergeApi = true;
         this.previreloader = false;
         }
        });
      }else if(this.hitMergeApi == true){
         var formData = new FormData(); 
        formData.append('user_id',this.userId);
        formData.append('quote_id',this.quoteId)
        this.apiservices.post(constant.showpdf,formData).subscribe((res:any)=>{
          this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(res.pdf_preview_link);
          console.log('merged final data 9999*****////+++***',res);
          this.previreloader = false;
        });
      }
     
    }
  ngOnInit(): void {
  
     this.activatedRoute.queryParams.subscribe(params => {
       this.userId = params['user'];
       this.quoteId = params['quote'];
      
     });
	this.apiservices.get(constant.pdf_modules).subscribe((res:any)=>{
    this.ModPdfs = res;
    console.log('main mod',this.ModPdfs);
  res.map(val=>{
    if(val.section_id == 1){
      this.newpdfdocs[0].section_type = "Select Third-party Data Sheets",
      this.newpdfdocs[0].mainsection_id = "se1",
      this.newpdfdocs[0].main_modules.push(val)
    }
    if(val.section_id == 2){
      this.newpdfdocs[1].section_type = "Select Product Information Documents",
      this.newpdfdocs[1].mainsection_id = "se2",
      this.newpdfdocs[1].main_modules.push(val)
    }
  })
	})
  }

}
