import { Component, VERSION } from '@angular/core';
import { LibraryService } from './library.service';
declare var p5:any;
declare var ml5:any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  p5;
  name = 'Angular ' + VERSION.major;
  constructor(private libraryService:LibraryService){

  }
  ngOnInit(){
    this.init();
  }
  async init(){
    await this.libraryService.loadML5();
    this.p5 = new p5(this.sketch);
  }
  sketch(p:any){
    let img 
    p.setup = () => {

      p.createCanvas(400, 400);
      img = p.createImg('assets/images/car.png',()=>{
          p.image(img, 0, 0);
      });
      //p.background(100);
       
      // const mobilenet = ml5.imageClassifier('MobileNet',()=>{
      //   console.log('model is ready')
      // })
    };

    p.draw = () => {
     
    };
  }
}
