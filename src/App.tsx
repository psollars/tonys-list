import {
  Autocomplete,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import Header from "./Header";
import { GroceryItem, KEY, GroceryListItem } from "./types";

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
      <Grid container spacing={2}>
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
        <Grid item xs={6} style={{ background: "#e2e2e2" }}>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            {Object.entries(listItemsBySection).map(([section, listItems]) => (
              <li key={section}>
                <ul>
                  <ListSubheader>{section}</ListSubheader>
                  {(listItems as GroceryListItem[]).map(
                    (item: GroceryListItem) => (
                      <ListItem key={item.id}>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    )
                  )}
                </ul>
              </li>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
}

const defaultGroceries = [
  { label: "Grapes", aisle: "3" },
  { label: "Salad", aisle: "deli" },
];

function usePersistentState(
  key: string,
  defaultValue: string
): [string, React.Dispatch<SetStateAction<string>>] {
  const initialValue =
    localStorage.getItem(`TONYS_LIST_${key}`) || defaultValue;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(`TONYS_LIST_${key}`, value);
  });

  return [value, setValue];
}
