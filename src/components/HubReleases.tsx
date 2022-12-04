import React from "react";
import styled from "styled-components";

import { useNina } from "../context/nina";
import { usePlayer } from "../context/player";

function HubReleases() {
  const { releases } = useNina();
  const { setCurrentTrack } = usePlayer();
  if (!releases) {
    return null;
  }

  releases.sort(
    (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
  );

  return (
    <HubReleasesContainer>
      {releases.map((release) => (
        <HubReleaseContainer
          onClick={() => {
            setCurrentTrack(release);
          }}
        >
          <ReleaseImage src={release.metadata.image} />
          <h2>{release.metadata.name}</h2>
          <p>{release.metadata.description}</p>
        </HubReleaseContainer>
      ))}
    </HubReleasesContainer>
  );
}

const HubReleasesContainer = styled.div`
  margin: 1em;
`;

const HubReleaseContainer = styled.div`
  display: flex;
  gap: 1em;
  margin: 1em 0;
`;

const ReleaseImage = styled.img`
  max-width: 300px;
`;

export default HubReleases;
