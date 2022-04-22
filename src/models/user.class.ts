
export class User {
  firstName!: string;
  lastName!: string;
  eMail!: string;
  birthDate!: number;
  street!: string;
  zipCode!: number;
  city!: string;
  IBAN!: string;

  constructor(obj?: any) { // Das Fragezeichen definiert das Argument object als 
    // optionales Attribut, d.h. der Konstruktor kann auch ohne diese Argument verwendet 
    // werden.
    this.firstName = obj ? obj.firstName : ''; // Diese Syntax liesst sich wie folgt:
    // Wenn der Boolsche Wert obj (d.h. in diesem Fall ist dies die Frage ob obj definiert ist)
    // wahr ist, wird this.firstName der Wert obj.firstName zugeordnet und ansonsten der Wert ''.
    this.lastName = obj ? obj.lastName : '';
    this.eMail = obj ? obj.eMail : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
    this.IBAN = obj ? obj.IBAN : 'DE00000000000000';
  }

  public toJSON() {
    return {
      firstName: this.firstName,
      lastName : this.lastName,
      eMail: this.eMail,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
      IBAN: this.IBAN
    }
  }
}