import { GroceryListItem } from "./types";

export function groupGroceryListItemsBySection(
  parsedListItems: GroceryListItem[]
): { section: string; item: GroceryListItem[] } {
  return parsedListItems.reduce(
    (list, item): { section: string; item: GroceryListItem[] } => {
      if (list.hasOwnProperty(item.aisle)) {
        return {
          ...list,
          [item.aisle]: [
            ...(list[
              item.aisle as keyof { section: string; item: GroceryListItem[] }
            ] as GroceryListItem[]),
            item,
          ],
        };
      }

      return { ...list, [item.aisle]: [item] };
    },
    {} as { section: string; item: GroceryListItem[] }
  );
}
