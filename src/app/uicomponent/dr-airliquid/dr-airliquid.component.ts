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
hitMergeApi = false;
previreloader = true;
isProcess = false;
storeUploadpdf = [];
userId;
quoteId;
//  *********************************************************
todos = [
  {
    name: 'Angular',
    category: 'Web Development'
  },
  {
    name: 'Flexbox',
    category: 'Web Development'
  },
  {
    name: 'iOS',
    category: 'App Development'
  },
  {
    name: 'Java',
    category: 'Software development'
  }
];

completed = [
  {
    name: 'Android',
    category: 'Mobile Development'
  },
  {
    name: 'MongoDB',
    category: 'Databases'
  },
  {
    name: 'ARKit',
    category: 'Augmented Reality'
  },
  {
    name: 'React',
    category: 'Web Development'
  }
];
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
testvar='0';
// @ViewChild(testvar) myInputVariable: ElementRef;
/** Get handle on cmp tags in the template */
@ViewChildren('optionalinputFile') myInputVariable:QueryList<any>;
@ViewChildren('documentinputFile') docInputVariable:QueryList<any>;
 removeAside(checkid,index,identifyname){
   this.testvar = checkid;
   console.log('my ///85***',  this.uploadpdfField);
  
  //  .toArray()
  //  console.log('my ///',this.myInputVariable.toArray()[0]);
  // this.myInputVariable.nativeElement.value = '';
  console.log('my index 99++', checkid,index,identifyname);
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
    // this.pdfFiles.splice(index,1)
    
  }
  // $('#tid'+this.checkboxfiles[index].mainid).trigger('click');
  // console.log('my index', checkid,this.checkboxfiles[index].mainid);
  // $('#tid'+this.checkboxfiles[index].mainid).trigger('click');
 
  // this.checkboxfiles.splice(index,1);
 }
  // Select third-party data sheets
newpdfdocs = [
  {"section_type":"","mainsection_id":"","main_modules":[]},
  {"section_type":"","mainsection_id":"","main_modules":[]}
]

uploadmainField = [{"unid":1,"name":"Cover letter"},{"unid":2,"name":"Budgetary quote"}]
uploadpdfField  = [{"unid":3,"name":"Reference material"},{"unid":4,"name":"Drawing"}]

  constructor(private apiservices:ApiservicesService,public sanitizer:DomSanitizer,private activatedRoute: ActivatedRoute) {
    // this.urlSafe = "";
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
      // this.checkboxfiles.push(mainobject);
    }else{
      this.pdfFiles.splice(stateIndex,1);
      // this.checkboxfiles.splice(stateIndex,1);
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

  // asidename
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
  // this.pdfFiles[index] = uniquevalue;
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
    // this.pdfFiles[index] = uniquevalue;
    this.pdfFiles.push(uniquevalue);
  }else{
    this.pdfFiles[index].filename = file;
  }
    console.log('find index new -1', index);
  }



   console.log('check final //',this.pdfFiles);  
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

      // =========================== new code
    //  var userId;
    //  var quoteId;
    //   this.activatedRoute.queryParams.subscribe(params => {
    //     this.userId = params['user'];
    //     thiquoteId = params['quote'];
       
    //   });
  
      formData.append('user_id', this.userId);
      formData.append('quote_id',this.quoteId);
      let testindexid = []
      this.pdfFiles.map((val,index)=>{
       
      if(val.filename){ 
        if(val.id == 1){  console.log('final submission id one',val);
        testindexid.push(index)
        formData.append('fd_cover_letter', val.filename[0]);
           }
        else if(val.id == 2){
          testindexid.push(index)
          formData.append('fd_price', val.filename[0]);
           console.log('final submission id two',val);
          }
          else if(val.id > 2){
             var otherpdf = []
             otherpdf.push(val.filename[0])
             console.log('here is greater',val.filename[0]);
             testindexid.push(index)
            formData.append('pdf_file[]', val.filename[0])
          }
        
       }
      
      });

      // console.log('here is data',formData);
      this.apiservices.post(constant.submitpdf,formData).subscribe((res:any)=>{
        if(res && res[0].status == true){
          testindexid.map((val,index)=>{ 
            // console.log('here is data responce ***',this.pdfFiles[val] );
            // console.log('here is data responce ***++', res[0].pdf_data[val].pdf_name );
            this.pdfFiles[val].pdf_name =  res[0].pdf_data[index].pdf_name;
            this.pdfFiles[val].pdf_type =  res[0].pdf_data[index].pdf_type;
            this.pdfFiles[val].pdf_id  =  res[0].pdf_data[index].pdf_id;
           })
           console.log('here is data responce *** ++',this.pdfFiles );
          // res[0].pdf_data.map(vals=>{

          // })
          // res[0].pdf_data.map(vals=>{
          //   this.storeUploadpdf.push(vals);
          // })
         
          // this.pdfFiles.map(val=>{
          //   if(val.mainid){
          //     this.storeUploadpdf.push(val);
          //   }
          // })


          console.log('here is data responce',res);
            console.log('here is data responce testindexid',testindexid);
            console.log('here is data responce testindexid',this.pdfFiles);
            // console.log('here is data responce 2',this.pdfFiles[0].filename);
            
            this.isMarged = false;
            this.isProcess = false;
            this.hitMergeApi = false;
            this.disabletab = false;
         }
        //  
      //   let finddata =  this.storeUploadpdf.findIndex(x => x.original_pdf_name === 1);
      //   console.log('here is data final one', this.storeUploadpdf);
      //   console.log('here is data final two', this.pdfFiles);
      //   let testing = []
      //   this.pdfFiles.map(newval=>{
      //     if(newval.filename){
      //      let indexseq1 = this.storeUploadpdf.findIndex(x => x.original_pdf_name === newval.filename[0].name);
      //      console.log('all index 1',indexseq1);
      //     }
      //     if(newval.mainid){
      //      let indexseq2 = this.storeUploadpdf.findIndex(x => x.original_pdf_name === newval.original_pdf_name);
      //      console.log('here is data final two',indexseq2);
      //     }
         
      //  })
        // 
       });
   
      //  ========================= new code
      // this.pdfFiles.map((val,index)=>{
      //   if(val.filename){
      //     val.filetype = "upload";
      //     let uniquename = Date.now() + Math.random() + "files.pdf";
      //     formData.append('pdffiles', val.filename[0],uniquename);
      //     let uniquefilename = Date.now() + Math.random() + "file";
      //     let x = {'newname':uniquefilename,'oldname':uniquename};
      //     this.arraySeq.splice(index, 0, x);
      //     console.log('final ch',val.filename);
      //   }

      //   if(val.mainid){   
      //      val.filetype = "convert";  
      //     let uniquename = Date.now() + Math.random() + "files.pdf";
      //      let uniquefilename = Date.now() + Math.random() + "file";
      //      let x = {'newname':uniquefilename,'oldname':uniquename};
      //      this.arraySeq.splice(index, 0, x);
      //      val.original_pdf_name = uniquename;
      //      arrayUrl.push(val)
      //      console.log('final ch2',val.mainid);}
      // })

      // formData.append('newpdffiles',JSON.stringify(arrayUrl));
      // formData.append('uniquedata', JSON.stringify(this.arraySeq));
      // this.isProcess = true;
      // this.apiservices.post(upload,formData).subscribe((res:any)=>{
      //   console.log('merged data',res);
      //   if(res){
      //     this.disabletab = false; this.pdfErrMsg = "pdf merged successfully";
      //     let checkedBoxid = [];
      //     this.isMarged = false;
      //     this.hitMergeApi = false;
      //     this.isProcess = false;

      //     this.myInputVariable.forEach(element => {
      //       element.nativeElement.value = '';
      //       console.log(element)
      //     });

      //     this.docInputVariable.forEach(element => {
      //       element.nativeElement.value = '';
      //       console.log(element)
      //     });

      //     this.pdfFiles.map(vals=>{
      //         if(vals.mainid){
      //           checkedBoxid.push(vals.mainid);
      //         }
      //     });

      //     $.each( checkedBoxid, function( index, value ) {
      //         $('#tid'+value).trigger('click');
      //     });

      //     this.pdfFiles = [];
      //     this.aside_covername = "cover Letter";
      //     this.aside_budgetarname = "Budgetary quote"
      //   }
      
      // });


       }
    }
 // this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl('http://127.0.0.1:8080/'+res.result);
    switchTab(){
      if(this.hitMergeApi == false){
           this.previreloader = true;
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(' ');
            // var userId;
            // var quoteId;

            //  this.activatedRoute.queryParams.subscribe(params => {
            //    userId = params['user'];
            //    quoteId = params['quote'];
              
            //  });
        let sortedarray = []
        this.pdfFiles.map(val=>{
          sortedarray.push({"pdf_type":val.pdf_type,"pdf_id":val.pdf_id})
        })
        console.log('final arrya is :-',sortedarray)
        var formData = new FormData(); 
        // formData.append('uniquedata', JSON.stringify(this.arraySeq));
        formData.append('user_id',this.userId);
        formData.append('quote_id',this.quoteId);
        formData.append('pdfs_data', JSON.stringify(sortedarray));
      //   for (var i = 0; i < dummyarr.length; i++) {
        
      // }
        
        this.apiservices.post(constant.mergepdf,formData).subscribe((res:any)=>{
        // this.apiservices.post(mergepdf,formData).subscribe((res:any)=>{
          // let mergeUrl ='https://demo-node-1.herokuapp.com/uploadspdf/'+res.url;
          // let mergeUrl = res.pdf_preview_link;
         console.log('merged final data ----',res);
         this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl('https://demo-node-1.herokuapp.com/uploadspdf/fdf');
         this.hitMergeApi = true;
         this.previreloader = false;
 
        });
      }
      // this.apiservices.get(mergepdf).subscribe((res:any)=>{
      //   console.log('merged final data',res);
      //   this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl('https://demo-node-1.herokuapp.com/uploadspdf/'+res.url);
      //  });
      
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
