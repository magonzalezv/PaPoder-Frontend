export class Publicacion {


    constructor (
        public nombre: string,
        public descripcion: string,
        public extracto: string,
        public categoria: string,
        public comentarios?: string,
        public img?: string,
        public puntuacion?: string,
        public visitas?: number,
        public usuario?: string,
        public _id?: string,
        public meGusta?: number,
        public meDivierte?: number,
        public meSorprende?: number,
        public meEntristece?: number,
        public meEnoja?: number,
        public meGustaPor?: Array<0>,
        public meDiviertePor?: Array<0>,
        public meSorprendePor?: Array <0>,
        public meEntristecePor?: Array <0>,
        public meEnojaPor?: Array <0>

    ) { }
}
