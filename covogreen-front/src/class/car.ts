
/**
 * @author Romain Lembo
 */
export class Car {
    public id_car: number;
    public licencePlate: string;
    public make: string;
    public model: string;
    public capacity: number;

    constructor(
        id_car: number,
        licencePlate: string,
        make: string,
        model: string,
        capacity: number,
    ) {
        this.id_car = id_car;
        this.licencePlate = licencePlate;
        this.make = make;
        this.model = model;
        this.capacity = capacity;
    }
}
