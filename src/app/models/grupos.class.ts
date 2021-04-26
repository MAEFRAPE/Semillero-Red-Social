import { Comentario } from "./comentario.class";
import { Reaccion } from "./reaccion.class";
import { Usuario } from "./usuario.class";

export class Grupos{
      
        
    public ID?:number
    public CreatedAt?:Date
    public imageUrl?:string  
    public users?:Usuario[]
    constructor(

        public name:string,
        public description:string,
        public creator_id:number,
        
      
    ){}
  }