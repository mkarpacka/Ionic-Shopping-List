import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import * as faker from "faker";

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
    options = {
        search: false,
        add: false,
        filter: false,
        sort: false,
        generate: false
    };
    selectedSort: any;
    selectedFilter: any;

    constructor(private route: ActivatedRoute,
                private router: Router, private storage: Storage) {
    }

    ngOnInit() {
        this.finishedItemsCount = 0;
        this.singleList = JSON.parse(this.route.snapshot.paramMap.get('shoppinglist'));
        this.key = this.singleList.name.replace(/ /g, "");
        this.editMode = true;
        this.readFromStorage();
    }

    handleAddOption() {
        this.options.add = true;
        this.options.search = false;
        this.options.filter = false;
        this.options.sort = false;
        this.options.generate = false;
    }

    handleSearchOption() {
        this.options.add = false;
        this.options.search = true;
        this.options.filter = false;
        this.options.sort = false;
        this.options.generate = false;
    }

    handleFilterOption() {
        this.options.add = false;
        this.options.search = false;
        this.options.filter = true;
        this.options.sort = false;
        this.options.generate = false;
    }

    handleSortOptions() {
        this.options.add = false;
        this.options.search = false;
        this.options.filter = false;
        this.options.sort = true;
        this.options.generate = false;
    }

    handleGenerate() {
        this.options.add = false;
        this.options.search = false;
        this.options.filter = false;
        this.options.sort = false;
        this.options.generate = true;
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

    onSearchTerm($event: CustomEvent) {
        const val = $event.detail.value;
        if (val && val.trim() !== '') {
            this.items = this.items.filter(term => {
                return term.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
            });
        } else {
            this.readFromStorage();
        }
    }

    sort() {
        var start = new Date().getTime();
        if(this.selectedSort == 'def'){
            this.readFromStorage()
        }
        if(this.selectedSort == 'high'){
            this.sortAscending();
        }
        if(this.selectedSort == 'low'){
            this.sortDescending();
        }
        if(this.selectedSort == 'rand'){
            this.shuffleArray();
        }
        var end = new Date().getTime();
        var time = end - start;
        console.log('Execution time : ' + time);
    }

     shuffleArray() {
         var start = new Date().getTime();
        this.items = this.items
            .map((a) => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)
         var end = new Date().getTime();
         var time = end - start;
         console.log('Execution time shuffle: ' + time);
    }

    filter() {
        if(this.selectedFilter == 'all'){
            this.readFromStorage()
        }
        if(this.selectedFilter == 'completed'){
            this.items = this.items.filter(term => {
                return term.isChecked
            });
        }
        if(this.selectedFilter == 'inprogress'){
            this.items = this.items.filter(term => {
                return !term.isChecked
            });
        }
    }

    sortAscending() {
        this.items.sort((a, b) => a.name.localeCompare(b.name));
    }

    sortDescending() {
        const ascending = this.items.sort((a, b) => a.name.localeCompare(b.name));
        ascending.sort().reverse();
    }

    generateFakeData() {
        for (let i = 0; i < 800; i++) {
            let fakeName = faker.fake("{{commerce.product}}")
            let fakeItem = {name: fakeName, isChecked: false};
            this.items.push(fakeItem);
        }
     this.saveToStorage();
    }

    navigateToEditList() {
        //przeslac tez itemy, przy zmianie usunac poprzednie i zapisac z nowym kluczem.
        this.router.navigate(['/edit-shoppinglist/' + JSON.stringify(this.singleList)]);
    }
}
