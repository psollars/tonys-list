import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { GroceryListItem } from "./types";

interface IGroceryList {
  listItemsBySection: {
    section: string;
    item: GroceryListItem[];
  };
}

export default function GroceryList(props: IGroceryList) {
  return (
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
        {Object.entries(props.listItemsBySection).map(
          ([section, listItems]) => (
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
          )
        )}
      </List>
    </Grid>
  );
}
