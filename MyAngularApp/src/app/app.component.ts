import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MyAngularApp-Bharath';
  itemArray = ['Item1'];
  color = '';
  condition = false;
  comment = '';

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.autoLogIn();
  }

  addNewItemParent(newItem : string){
    this.itemArray.push(newItem);
  }

  deleteItemParent(){
    this.itemArray.pop()
  }

  onSubmit(form: NgForm){
    console.log(form);
  }
}
