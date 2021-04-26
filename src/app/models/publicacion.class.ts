import { Comentario } from "./comentario.class";
import { Reaccion } from "./reaccion.class";
import { Usuario } from "./usuario.class";

export class Publicacion{
  
  public comments?:Comentario[]
  public CreatedAt?:Date
  public ID?:number 
  public reactions?:Reaccion[]
  public User?:Usuario 
    constructor(
      
      public posted_text:string, 
      public user_id:number,
      public user:Usuario,
      public image_url?:string 
      
    ){}
  }