import { Categoria } from "./categoria.model";
import { Nivel } from "./nivel.model";
import { Rol } from "./rol.model";
import { SubCategoria } from "./subcategoria.model";

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
}