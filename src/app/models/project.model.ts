import { IProject } from "@interfaces/index.ts";

export class Project implements IProject {
  id: number = 0;
  name: string = "";
  username: string = "";
  email: string = "";
  address: Address = new Address();
  phone: string = "";
  website: string = "";
  company: Company = new Company();
}

export class Address {
  street: string = "";
  suite: string = "";
  city: string = "";
  zipcode: string = "";
  geo: Geo = new Geo();
}

export class Geo {
  lat: string = "";
  lng: string = "";
}

export class Company {
  name: string = "";
  catchPhrase: string = "";
  bs: string = "";
}
