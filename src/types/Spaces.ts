import { Permission } from "./Common";

export interface Space {
  id: string;
  version: number;
  name: string;
  permissions: Permission[];
  icon?: string;
  beta_enabled: boolean;
  pages: string[];
  disable_public_access?: boolean;
  disable_guests?: boolean;
  disable_move_to_space?: boolean;
  disable_export?: boolean;
  created_time: number;
  last_edited_time: number;
  created_by_id: string;
  created_by_table: string;
  last_edited_by_table: string;
  last_edited_by_id: string;
  plan_type: string;
  invite_link_enabled: boolean;
}

export interface SpaceView {
  id: string;
  version: number;
  space_id: string;
  parent_id: string;
  parent_table: string;
  alive: boolean;
  notify_mobile: boolean;
  notify_desktop: boolean;
  notify_email: boolean;
  visited_templates: string[];
  sidebar_hidden_templates: string[];
  created_getting_started: boolean;
  created_onboarding_templates: boolean;
  joined: boolean;
}
