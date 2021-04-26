import { Usuario } from "./usuario.class";

export class Comentario{
  public ID?:number
  public CreatedAt?:string
  public User?:Usuario
    constructor(
      
      public post_id:number,
      public comment:string,
      public user_id:number,
      
      
    ){}
  }

 