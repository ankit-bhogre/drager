import { Component, OnInit } from '@angular/core';

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
  constructor() { }
  requiredInput(filename,file){
    // console.log('file type...1',filename,file)
    switch (filename) {
      case 'cover':
        this.coverLetter = file;
        console.log('file type...2',  this.coverLetter)
        break;
      case 'budegetary':
        this.budgetaryQuote = file;
        console.log('file type...3',this.budgetaryQuote)
        break;
      case 'reference':
        this.referenceMaterial = file;
        console.log('file type...4', this.referenceMaterial)
        break;
      case  'drawing':
        this.drawing = file;
        console.log('file type...5', this.drawing)
        break;
       case  'pdfdocument':
         this.pdfDocument = file;
        console.log('file type...6',this.pdfDocument)
    }


  }
  submitPdf(){
    console.log('submit pdf1',this.coverLetter);
    console.log('submit pdf2',this.budgetaryQuote);
    console.log('submit pdf3',this.referenceMaterial);
    console.log('submit pdf4',this.drawing);
    console.log('submit pdf5',this.pdfDocument);
  }
  ngOnInit(): void {
  }

}
