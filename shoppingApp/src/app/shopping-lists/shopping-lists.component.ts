import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

interface ShoppingList {
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.scss'],
})

export class ShoppingListsComponent implements OnInit {

  shoppingLists: ShoppingList[] = [];
  listName: string = "";
  isCompleted: boolean = false;


  constructor(private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit() {}

  addNewShoppingList(){
    if(this.listName.length > 0){
      let shoppingList = {name: this.listName, completed: false};
      this.shoppingLists.push(shoppingList);
      this.listName = '';
    }
  }

  toggleComplete = (index: number): void => {
    this.shoppingLists[index].completed = !this.shoppingLists[index].completed;
  };


  navigateToSingleList(shoppingList) {
    this.router.navigate(['/single-list/' + JSON.stringify(shoppingList)]);
  }

  removeItem(index: number) {
    this.shoppingLists.splice(index, 1);
  }
}
