import { Grid, Typography } from "@mui/material";

export default function Header() {
  return (
    <Grid
      container
      sx={{
        margin: 0,
        width: "unset",
        padding: 2,
        borderBottom: "4px solid #0A623A",
      }}
      spacing={2}
    >
      <Grid item xs={6}>
        <Typography sx={{ color: "#AD1F30" }} variant="h2" component="h1">
          Tony's List
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          sx={{ display: "flex", justifyContent: "flex-end" }}
          variant="h3"
          component="div"
        >
          ππ₯©π«πΊπ₯π
        </Typography>
      </Grid>
    </Grid>
  );
}
