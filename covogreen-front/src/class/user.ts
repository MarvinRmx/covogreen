export class User {
    public id_user: number;
    public lastName: string;
    public firstName: string;
    public username: string;
    public email: string;
    public password: string;
    public address: string;
    public city: string;
    public cp: string;
    public phone: string;
    public is_driver: boolean;
    public id_car: number;
    public privilege: number;

    constructor(
        id_user: number,
        lastName: string,
        firstName: string,
        username: string,
        email: string,
        password: string,
        address: string,
        city: string,
        cp: string,
        phone: string,
        is_driver: boolean
    ) {
        this.id_user = id_user;
        this.lastName = lastName;
        this.firstName = firstName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
        this.city = city;
        this.cp = cp;
        this.phone = phone;
        this.is_driver = is_driver;
    }
}
