import React from "react";
import HubInfo from "./components/HubInfo";
import HubReleases from "./components/HubReleases";
import { NinaProvider } from "./context/nina";
import { PlayerProvider } from "./context/player";

function App() {
  return (
    <NinaProvider>
      <PlayerProvider>
        <HubInfo />
        <HubReleases />
      </PlayerProvider>
    </NinaProvider>
  );
}

export default App;
