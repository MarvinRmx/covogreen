
/**
 * @author Romain Lembo
 */
export class InscriptionJourney {
    public id: number;
    public id_user: number;
    public id_trajet: number;
    public rate: number;

    constructor(
        id: number,
        id_user: number,
        id_trajet: number
    ) {
        this.id = id;
        this.id_user = id_user;
        this.id_trajet = id_trajet;
    }
}
