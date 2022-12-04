import * as React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Release } from "../types/ninaTypes";

const PlayerContext = React.createContext<PlayerContextValue>({
  setCurrentTrack: () => null,
  playing: false,
});

type PlayerContextValue = {
  currentTrack?: Release;
  setCurrentTrack: (release: Release) => void;
  playing: boolean;
};

type PlayerProviderProps = {
  children?: React.ReactNode;
};

function PlayerProvider({ children }: PlayerProviderProps) {
  const [currentTrack, setCurrentTrack] = useState<Release>();
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (currentTrack) {
      playerRef.current?.play();
      setPlaying(true);
    }
  }, [currentTrack]);

  const value = { currentTrack, setCurrentTrack, playing };
  return (
    <PlayerContext.Provider value={value}>
      {children}
      {currentTrack && (
        <audio src={currentTrack?.metadata?.animation_url} ref={playerRef} />
      )}
      <PlayerContainer>
        <Cover src={currentTrack?.metadata?.image} />
        <TrackTitle>{currentTrack?.metadata?.properties?.title}</TrackTitle>
        <button
          onClick={() => {
            if (playing) {
              playerRef?.current?.pause();
            } else {
              playerRef?.current?.play();
            }
            setPlaying(!playing);
          }}
        >
          {playing ? "⏸️" : "▶️"}
        </button>
      </PlayerContainer>
    </PlayerContext.Provider>
  );
}

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  position: fixed;
  padding: 10px;
  bottom: 0;
  right: 0;
  top: unset;
  background-color: white;
`;

const TrackTitle = styled.h3``;

const Cover = styled.img`
  width: 30px;
  height: 30px;
`;

function usePlayer() {
  const context = React.useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

export { PlayerProvider, usePlayer };
