import React from 'react';
import { NavBar } from "./components/NavBar/NavBar";
import { ScoreBoard } from "./pages/ScoreBoard/ScoreBoard";
import { Container } from "@chakra-ui/react";

function App() {
  return (
    <>
      <NavBar/>
      <Container maxW="container.xl" marginTop="36" marginBottom="24">
        <ScoreBoard/>
      </Container>
    </>
  );
}

export default App;
