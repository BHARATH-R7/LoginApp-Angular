import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core"

import { ListComponent } from "./list/list.component";
import { AddEditComponent } from "./add-edit/add-edit.component";
import { UserComponent } from "./user.component";

const userRoutes: Routes = [
    {
        path: '', 
        component: UserComponent,
        children: [
            { path: 'get', component: ListComponent },
            { path: 'add', component: AddEditComponent },
            { path: 'edit/:id', component: AddEditComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})

export class UserRoutingModule{}