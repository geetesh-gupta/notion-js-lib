import { Pointer } from "./Common";

export interface NotionUser {
  id: string;
  version: number;
  email: string;
  given_name: string;
  family_name: string;
  profile_photo: string;
  onboarding_completed: boolean;
}

export interface UserSettings {
  id: string;
  version: number;
  settings: Settings;
}

export interface UserRoot {
  id: string;
  version: number;
  space_views: string[];
  space_view_pointers: Pointer[];
}
export interface PublicPageData {
  spaceName: string;
  spaceId: string;
  spaceDomain: string;
  canJoinSpace: boolean;
  icon: string;
  userHasExplicitAccess: boolean;
  ownerUserId: string;
  betaEnabled: boolean;
  canRequestAccess: boolean;
  requireLogin: boolean;
  publicAccessRole: string;
}

export interface Settings {
  type: string;
  locale: string;
  persona: string;
  team_role: string;
  time_zone: string;
  signup_time: number;
  preferred_locale: string;
  used_windows_app: boolean;
  used_desktop_web_app: boolean;
  preferred_locale_origin: string;
}

// To parse types from js
// copy(JSON.parse(JSON.stringify(a)))
// https://app.quicktype.io/
