import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class LibraryService{
  loadSingleLibrary(name, link){
    return new Promise((resolve,reject)=>{
      if(document.getElementById("__js_" + name)){
        resolve();
      }else{
        const script = document.createElement("script");
        script.id = "__js_" + name;
        script.src = link
        script.onload = ()=>{
          resolve();
        }
        document.head.appendChild(script);
      }
    })
  }

  ml5Scripts = [
    ["p5js", "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"],
    ["p5dom", "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"],
    ["p5sound", "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.sound.min.js"],
    ["ml5", "https://unpkg.com/ml5@0.4.3/dist/ml5.min.js"],
  ]

  async loadML5(){
    for(let i = 0; i<this.ml5Scripts.length; i++){
      await this.loadSingleLibrary(this.ml5Scripts[i][0], this.ml5Scripts[i][1]);
    }
  }
}