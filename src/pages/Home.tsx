import { Button, Grid } from "@mui/material";
import React from "react";
import { ContactList } from "../components/ContactList";

export const HomePage: React.FC<{}> = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" href="/new" fullWidth>
          New contact
        </Button>
      </Grid>
      <Grid item xs={12}>
        <ContactList />
      </Grid>
    </Grid>
  );
};
