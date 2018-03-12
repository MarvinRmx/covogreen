export class RechercheFormEnt {
    public depart: string;
    public destination: string;
    public date_trajet: string;
    public place_libre: Boolean;

    constructor(depart?: string, destination?: string, place_libre?: Boolean, date_trajet?: string) {
        this.depart = depart;
        this.destination = destination;
        this.date_trajet = date_trajet;
        this.place_libre = place_libre;
    }
}
