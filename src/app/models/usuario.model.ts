import { environment } from "src/environments/environment";
import { Categoria } from "./categoria.model";
import { Nivel } from "./nivel.model";
import { Rol } from "./rol.model";
import { SubCategoria } from "./subcategoria.model";

const base_url = environment.base_url;

export class Usuario {
    constructor(
        public email: string,
        public password: string,
        public rut: string,
        public nombres: string,
        public apellidos: string,
        public google?: boolean,
        public roles?: Rol[],
        public fechaNacimiento?: Date,
        public telefono?: string,
        public img?: string,
        public nivel?: Nivel,
        public categoria?: Categoria[],
        public subCategoria?: SubCategoria[],
    ) { }

    get imagenUrl(){
      console.log(this.img);
      if (this.img?.includes('https')){
        return this.img;
      }

      if (this.img){
        return `${base_url}/uploads/usuarios/${ this.img }`;
      }
      return `${base_url}/uploads/usuarios/no-image`;

    }

    get nombreCompleto(){
      return `${this.nombres} ${this.apellidos}`;

    }
}
