import { Dispatch, SetStateAction } from "react";
import { SFTPFormData } from "./forms";

export interface ProfileManagerProps {
  profiles: SFTPFormData[];
  darkMode: boolean;
  onProfileSelect: (profile: FormData) => void;
  onProfileDelete: (index: number) => void;
  onProfileSave: (profile: FormData) => void;
  setProfiles: Dispatch<SetStateAction<FormData[]>>;
  setFormData: Dispatch<SetStateAction<FormData>>;
  toggleDarkMode: () => void;
}

export interface ProfileManagerState {
  selectedProfile: string;
  isTestingConnection: boolean;
}

export interface GeneratedJSONProps {
  config: FormData;
  darkMode: boolean;
}
