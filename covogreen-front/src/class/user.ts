export class User {
    public id_user: number;
    public username: string;
    public password: string;
    public email: string;
    public lastname: string;
    public firstname: string;
    public city: string;
    public street: string;
    public cp: number;
    public country: string;

    constructor(
        id_user: number,
        username: string,
        password: string,
        email: string,
        lastname: string,
        firstname: string,
        city: string,
        street: string,
        cp: number,
        country: string
    ) {
        this.id_user = id_user;
        this.username = username;
        this.password = password;
        this.email = email;
        this.lastname = lastname;
        this.firstname = firstname;
        this.city = city;
        this.street = street;
        this.cp = cp;
        this.country = country;
    }
}
