"use client";
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const HeaderComponent = () => {

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'center' }}>
        <Typography variant="h6">
        Clima Carbonator: Predicts Carbon Dioxide Emission Levels

        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
