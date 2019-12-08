import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

interface ShoppingList {
  name: string;
  completed: boolean;
}
@Component({
  selector: 'app-single-shopping-list',
  templateUrl: './single-shopping-list.component.html',
  styleUrls: ['./single-shopping-list.component.scss'],
})
export class SingleShoppingListComponent implements OnInit {

  singleList:  ShoppingList;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.singleList = JSON.parse(this.route.snapshot.paramMap.get('shoppinglist'));
  }

}
