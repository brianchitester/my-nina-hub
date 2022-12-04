import React from "react";
import HubInfo from "./components/HubInfo";
import HubReleases from "./components/HubReleases";
import { NinaProvider } from "./context/nina";

function App() {
  return (
    <NinaProvider>
      <HubInfo />
      <HubReleases />
    </NinaProvider>
  );
}

export default App;
