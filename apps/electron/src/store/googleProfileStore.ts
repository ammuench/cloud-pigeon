import { create } from "zustand";

import { GoogleProfile } from "../services/google-profile.service";

type GoogleProfileStore = {
  profile: GoogleProfile | null;
  setGoogleProfile: (profile: GoogleProfile) => void;
};

export const useGoogleProfileStore = create<GoogleProfileStore>((set) => ({
  profile: null,
  setGoogleProfile: (profile: GoogleProfile) => set(() => ({ profile })),
}));
