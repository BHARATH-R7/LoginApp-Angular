import { Component, OnInit } from '@angular/core';
import { catchError, first } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from '../user.service';
import { CrudUser } from '../../models/cruduser';
import { AuthService } from '../../auth/auth.service';

@Component(
    {
        templateUrl: 'list.component.html',
        styleUrls: ['list.component.css']
    }
)
export class ListComponent implements OnInit {
    users!: CrudUser[];
    ForbiddenErrorMsg: string ='';
    hasWriteAccess: boolean = false;

    constructor(private userService: UserService, private authService: AuthService) { }

    ngOnInit() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
            this.hasWriteAccess = this.authService.hasWriteAccess;
    }
  
    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        if (!user) return;
        
        this.userService.delete(id)
            .pipe(
                catchError(this.HandleErrors)
            )
            .subscribe({
                next: () => {this.users = this.users.filter(x => x.id !== id),
                    user.isDeleting = true;},
                error: (err) => {this.ForbiddenErrorMsg = err}
            }
            );
    }

    
    private HandleErrors(err: HttpErrorResponse) {
        let errorMessage = 'An Unknown Error Occured!';
        if(err.status == 403){
            errorMessage = 'Access Denied! You dont have sufficient permission';
        }
        return throwError(() => new Error(errorMessage));
    }

}