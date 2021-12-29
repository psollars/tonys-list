import { Autocomplete, Grid, TextField } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import { usePersistentState } from "./hooks";
import { GroceryItem, KEY, GroceryListItem } from "./types";
import defaultGroceries from "./groceries.json";
import GroceryList from "./GroceryList";

// #AD1F30
// #0A623A

export default function App() {
  const [value, setValue] = useState<GroceryItem>({ label: "", aisle: "" });
  const [inputValue, setInputValue] = useState("");
  const [groceryItems, setGroceryItems] = usePersistentState(
    KEY.GROCERY_ITEMS,
    JSON.stringify(defaultGroceries)
  );
  const [listItems, setListItems] = usePersistentState(KEY.LIST_ITEMS, "[]");

  const parsedGroceryItems: GroceryItem[] = JSON.parse(groceryItems);
  const parsedListItems: GroceryListItem[] = JSON.parse(listItems);
  const listItemsBySection = parsedListItems.reduce(
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

  return (
    <>
      <Header />
      <Grid
        sx={{ height: "calc(100vh - 124px)", margin: 0, width: "unset" }}
        container
        spacing={2}
      >
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            freeSolo
            options={parsedGroceryItems}
            sx={{ width: 300 }}
            value={value}
            onChange={(_e, newValue, reason) => {
              console.log(newValue, reason);

              if (reason === "createOption") {
                const newItem = { label: newValue as string, aisle: "new" };
                setListItems(JSON.stringify([...parsedListItems, newItem]));
                setGroceryItems(
                  JSON.stringify([...parsedGroceryItems, newItem])
                );

                setValue(newItem);
              }

              if (newValue && typeof newValue === "object") {
                setListItems(JSON.stringify([...parsedListItems, newValue]));
                setValue(newValue);
              }
            }}
            inputValue={inputValue}
            onInputChange={(_e, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Groceries" />
            )}
          />
        </Grid>
        <GroceryList listItemsBySection={listItemsBySection} />
      </Grid>
    </>
  );
}
