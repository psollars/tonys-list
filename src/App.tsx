import { Autocomplete, Grid, TextField } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import { usePersistentState } from "./hooks";
import { GroceryItem, KEY, GroceryListItem } from "./types";
import defaultGroceries from "./groceries.json";
import GroceryList from "./GroceryList";
import { groupGroceryListItemsBySection } from "./utils";
import { v4 as uuidv4 } from "uuid";

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
  const listItemsBySection = groupGroceryListItemsBySection(parsedListItems);

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
                const newItem: GroceryListItem = {
                  id: uuidv4(),
                  label: newValue as string,
                  aisle: "new",
                  quantity: 1,
                  notes: "",
                  checked: false,
                };
                setListItems(JSON.stringify([...parsedListItems, newItem]));
                setGroceryItems(
                  JSON.stringify([...parsedGroceryItems, newItem])
                );

                setValue(newItem);
              }

              if (newValue && typeof newValue === "object") {
                const newItem: GroceryListItem = {
                  ...newValue,
                  id: uuidv4(),
                  quantity: 1,
                  notes: "",
                  checked: false,
                };
                setListItems(JSON.stringify([...parsedListItems, newItem]));
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
