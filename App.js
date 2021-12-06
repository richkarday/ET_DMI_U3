import React from 'react';
import { registerRootComponent } from 'expo';

// import Client from './pages/Client';
import RentalBook  from './pages/RentalBook';
import SingupScreen from './pages/Singup';

export default function App() {

  return (
    <SingupScreen/>
  );
}
registerRootComponent(App);


