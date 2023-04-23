import { create } from "zustand";

export type GoogleProfile = {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  sub: string;
};

type GoogleProfileStore = {
  profile: GoogleProfile | null;
  setGoogleProfile: (profile: GoogleProfile) => void;
};

export const useGoogleProfileStore = create<GoogleProfileStore>((set) => ({
  profile: null,
  setGoogleProfile: (profile: GoogleProfile) => set(() => ({ profile })),
}));
