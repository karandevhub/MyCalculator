import React from 'react';
import Navigation from '@navigation/Navigation';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Navigation />
    </>
  );
};

export default App;
