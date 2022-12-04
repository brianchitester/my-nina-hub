import React from "react";
import styled from "styled-components";

import { useNina } from "../context/nina";

function HubInfo() {
  const { hub } = useNina();

  if (!hub) {
    return null;
  }

  return (
    <HubInfoContainer className="HubInfo">
      <HubImage src={hub.data.image} />
      <div>
        <h1>{hub.data.displayName}</h1>
        <h2>{hub.data.description}</h2>
        <a href={hub.data.externalUrl} target="_blank">
          view on nina
        </a>
      </div>
    </HubInfoContainer>
  );
}
const HubInfoContainer = styled.div`
  display: flex;
  gap: 1em;
  margin: 1em;
`;

const HubImage = styled.img`
  max-width: 200px;
`;

export default HubInfo;
