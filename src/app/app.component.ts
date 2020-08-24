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
    this.p5 = new p5((p)=>{
      return this.sketch(p)
    });
  }
  sketch(p:any){
    let img;
    
  
    p.setup = () => {

      p.createCanvas(400, 400);
      img = p.createImg('https://raw.githubusercontent.com/nadeemcite/ml5-learn/master/src/assets/images/car.png?raw=true',()=>{
          p.image(img, 0, 0, p.width, p.height);
      });
      img.hide();
      const mobilenet = ml5.imageClassifier('MobileNet',()=>{
        
        let img2 = new Image();
        img2.setAttribute("crossorigin" , "anonymous");
        img2.onload = ()=>{
          mobilenet.predict(img2,(result)=>{
            console.log(result)
          })
        }
        img2.src= "https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5d35eacaf1176b0008974b54%2F0x0.jpg%3FcropX1%3D790%26cropX2%3D5350%26cropY1%3D784%26cropY2%3D3349"

        
      })
    };

    p.draw = () => {
     
    };
  }
  getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
}
