export enum KEY {
  GROCERY_ITEMS = "GROCERY_ITEMS",
  LIST_ITEMS = "LIST_ITEMS",
}

export type GroceryItem = { label: string; aisle: string };

export type GroceryListItem = GroceryItem & {
  id: string;
  quantity: string;
  notes: string;
  checked: boolean;
};
