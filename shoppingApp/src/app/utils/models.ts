interface ShoppingList {
    name: string;
    completed: boolean;
    items: ItemsList[];
}

interface ItemsList {
    name: string;
    isChecked: boolean;
}
