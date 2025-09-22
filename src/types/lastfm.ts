export type LastFmImage = {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
};

export type LastFmTrack = {
  name: string;
  artist: {
    "#text": string;
    mbid?: string;
  };
  album?: {
    "#text": string;
    mbid?: string;
  };
  image: LastFmImage[];
  url: string;
  "@attr"?: {
    nowplaying?: "true" | "false";
  };
};

export type LastFmUser = {
  name: string;
  playcount: string;
  registered: {
    unixtime: string;
    "#text": number;
  };
  url: string;
  image: LastFmImage[];
};

export type LastFmAlbum = {
  name: string;
  playcount: number;
  artist: {
    name: string;
    mbid?: string;
  };
  image: LastFmImage[];
  url: string;
};

export type LastFmArtist = {
  name: string;
  playcount: number;
  mbid?: string;
  url: string;
  image: LastFmImage[];
};

export type LastFmResponse = {
  recenttracks?: {
    track: LastFmTrack[];
    "@attr": {
      user: string;
      total: string;
      page: string;
    };
  };
  error?: number;
  message?: string;
};

export type UserEmbed = {
  title: string;
  description: string;
  videoUrl?: string;
  status: "Now Playing" | "Last Played";
  image: string;
};
