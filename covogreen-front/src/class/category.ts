export class Category {
    public id: number;
    public libelle: string;

    constructor(
        id: number,
        libelle: string,
    ) { 
        this.id = id;
        this.libelle = libelle;
    }
}