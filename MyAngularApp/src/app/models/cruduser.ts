import { Role } from './role';

export class CrudUser {
    id!: string;
    title!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    role!: Role;
    isDeleting: boolean = false;
}


//// The exlamatory symbol "!" indicates that the id property will be definitely assigned before use.