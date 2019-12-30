import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-edit-shoppinglist',
  templateUrl: './edit-shoppinglist.component.html',
  styleUrls: ['./edit-shoppinglist.component.scss'],
})
export class EditShoppinglistComponent implements OnInit {
  private singleList: any;
  newName: any;
  private shoppingLists: any;
  private key: string;
  newKey: string;
  private items: any;

  constructor(private route: ActivatedRoute,
              private router: Router, private storage: Storage) {
  }

  ngOnInit() {
    this.readAllListsFromStorage();
    this.singleList = JSON.parse(this.route.snapshot.paramMap.get('shoppinglist'));
    this.readItemsOfEditedList();
  }

  editName() {
    let index = this.shoppingLists.findIndex(x => x.name === this.singleList.name);
    // this.shoppingLists[index].name = this.newName;

    this.shoppingLists.splice(index, 1);
    let editedShoppingList = {name: this.newName, completed: this.singleList.completed};
    this.shoppingLists.push(editedShoppingList)

    this.newKey = this.newName.replace(/ /g, "");
    this.storage.set(this.newKey, this.items);
    this.storage.set('shopping-lists', this.shoppingLists);
    this.readAllListsFromStorage();
    console.log(this.shoppingLists);
    this.router.navigateByUrl('/single-list/' + JSON.stringify(editedShoppingList));
    // this.router.navigate(['/shopping-lists/']);
  }

  readAllListsFromStorage() {
    this.storage.get('shopping-lists').then((val) => {
      if (val) this.shoppingLists = val;
    });
  }

  readItemsOfEditedList() {
    this.key = this.singleList.name.replace(/ /g, "");
    this.storage.get(this.key).then((val) => {
      if (val) this.items = val;
    });
  }
}
