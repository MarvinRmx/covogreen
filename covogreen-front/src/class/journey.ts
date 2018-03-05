export class Journey {
    public id_journey: number;
    public origin: string;
    public destination: string;
    public seats_available: number;
    public date_journey: Date;

    constructor(
        id_journey: number,
        origin: string,
        destination: string,
        seats_available: number,
        date_journey: Date,
    ) {
        this.id_journey = id_journey;
        this.origin = origin;
        this.destination = destination;
        this.seats_available = seats_available;
        this.date_journey = date_journey;
    }
}
