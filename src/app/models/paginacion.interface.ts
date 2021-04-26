import { Publicacion } from "./publicacion.class";

export interface Paginacion {
    count: number;
    next: string;
    previous: string;
    results: Publicacion[]
  }