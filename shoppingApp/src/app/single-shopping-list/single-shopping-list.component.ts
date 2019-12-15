import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'app-single-shopping-list',
    templateUrl: './single-shopping-list.component.html',
    styleUrls: ['./single-shopping-list.component.scss'],
})
export class SingleShoppingListComponent implements OnInit {

    singleList: ShoppingList;
    itemToAdd: string;
    items: ItemsList[] = [];
    finishedItemsCount;
    key: string;
    editMode: any;

    constructor(private route: ActivatedRoute, private storage: Storage) {
    }

    ngOnInit() {
        this.finishedItemsCount = 0;
        this.singleList = JSON.parse(this.route.snapshot.paramMap.get('shoppinglist'));
        this.key = this.singleList.name.replace(/ /g, "");
        this.editMode = true;
        this.readFromStorage();
    }

    addNewItem() {
        if (this.itemToAdd.length > 0) {
            let shoppingListItem = {name: this.itemToAdd, isChecked: false};
            this.items.push(shoppingListItem);
            this.singleList.items = this.items;
            this.itemToAdd = '';
            this.saveToStorage();
        }
    }

    saveToStorage() {
        this.storage.set(this.key, this.items);

    }

    readFromStorage() {
        this.storage.get(this.key).then((val) => {
            if (val)
                this.items = val;
        });
    }

    handleChecked(item: ItemsList) {
        if (item.isChecked) {
            this.finishedItemsCount++;
        } else {
            this.finishedItemsCount--;
        }
        if (this.finishedItemsCount < 0) this.finishedItemsCount = 0;
        this.saveToStorage();
    }

    removeItem(index: number) {
        this.items.splice(index, 1);
        this.saveToStorage();
    }

}
