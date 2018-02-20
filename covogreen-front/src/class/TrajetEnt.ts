export class TrajetEnt {
    public id: number;
    public depart: string;
    public destination: string;
    public date_trajet: Date;
    public auteur: string;
    public nombre_place_disponible: number;

    constructor(id: number, depart: string, destination: string, date_trajet: Date, auteur: string, nombre_place_disponible: number ) {
        this.id = id;
        this.depart = depart;
        this.destination = destination;
        this.date_trajet = date_trajet;
        this.auteur = auteur;
        this.nombre_place_disponible = nombre_place_disponible;
    }
}
