import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { ListComponent } from "./list/list.component";
import { AddEditComponent } from "./add-edit/add-edit.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";

@NgModule({
    declarations: [
        UserComponent,
        ListComponent,
        AddEditComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UserRoutingModule, 

    ]
})

export class UserModule { }