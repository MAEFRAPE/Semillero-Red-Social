import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CargarImgService {
  urlant:Observable<any>= of("")
  url:string=""
  


constructor(
  private storage: AngularFireStorage
) { }

ngOnInit(): void {
}

 

 subir(evt:any) {
      const archivo= evt.target.files[0]
      const partes= archivo.name.split('.')
      const extension= partes[partes.length -1]
      const nombre= `${Date.now()}.${extension}`
      const path= `uploads/${nombre}`
      const ref = this.storage.ref(path)
      const tarea = this.storage.upload(path,archivo)
      tarea.snapshotChanges().pipe(
        
          finalize(()=>{
            ref.getDownloadURL().subscribe(elem =>{ 
              this.guardarUrl(elem)
          })
        })  
      ).subscribe();
    
    
  }  
  guardarUrl(elem:any){

    this.url=elem
    
  }
  getUrl(){
    return this.url
  }


}

