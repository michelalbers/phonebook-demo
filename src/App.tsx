import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { Outlet } from "react-router-dom";
import { ContactDbContext, useContactDb } from "./hooks/useContactDb";
import "./App.css";
import { HomePage } from "./pages/Home";
import { NewContactPage } from "./pages/NewContact";
import { ContactEditorPage } from "./pages/ContactEditor";

export const InnerApp: React.FC<{}> = (props) => {
  const { contacts, addContact, removeContact, updateContact } = useContactDb();
  return (
    <ContactDbContext.Provider
      value={{
        contacts,
        addContact,
        removeContact,
        updateContact,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper sx={{ maxWidth: "sm", width: "100%", m: "1rem auto", p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Super smart phonebook 3000
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Outlet />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ContactDbContext.Provider>
  );
};

export const App: React.FC<{}> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InnerApp />}>
          <Route index element={<HomePage />} />
          <Route path={"/new"} element={<NewContactPage />} />
          <Route path={"/edit/:id"} element={<ContactEditorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
