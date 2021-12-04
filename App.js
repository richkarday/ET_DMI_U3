import React from 'react';
import { registerRootComponent } from 'expo';

// import Client from './pages/Client';
import RentalBook  from './pages/RentalBook';

export default function App() {

  return (
    <RentalBook/>
  );
}
registerRootComponent(App);


