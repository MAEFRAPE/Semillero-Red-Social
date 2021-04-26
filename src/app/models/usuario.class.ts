export class Usuario{
  public ID?: number
  public avatar?:string 
  constructor(
  public name:string,
  public email: string,
  public password:string,
  ){}
}
