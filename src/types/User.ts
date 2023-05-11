export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface loginEntry {
  email: string;
  password: string;
}

export interface loginInput {
  email: string;
  password: string;
}
