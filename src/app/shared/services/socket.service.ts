import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  

  socket:WebSocket

  constructor(

    private servicioPost: PostService

  ) { 

    this.socket=new WebSocket("ws://18.189.21.84:5050/ws")

    this.socket.onopen= evt =>{
      console.log("Abierto..")
    }

    this.socket.onclose= evt =>{
      console.log("Cerrado..")
    } 

    this.socket.onmessage= evt =>{

      const data=JSON.parse(evt.data)
       this.servicioPost.susbcriPost.next(data)
       
      console.log(JSON.parse(evt.data))

    }




  }
}
