import { Usuario } from "./usuario.class";
  export class Reaccion{
    CreatedAt?: Date
    UpdatedAt?: Date
    DeletedAt?: null  
    user?:Usuario 
    constructor(
      public post_id: number, 
      public user_id: number,
      
        
    ){}
}