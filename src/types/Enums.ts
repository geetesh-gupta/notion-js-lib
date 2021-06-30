export enum Role {
  Editor = "editor",
  Reader = "reader",
}

export enum Table {
  Block = "block",
  Space = "space",
  Collection = "collection",
  SpaceView = "space_view",
}

export enum PermissionType {
  PublicPermission = "public_permission",
  UserPermission = "user_permission",
}

export enum BlockType {
  Page = "page",
  Text = "text",
  Todo = "to_do",
  Header = "header",
  BulletedList = "bulleted_list",
  NumberedList = "numbered_list",
  Toggle = "toggle",
  Quote = "quote",
  Divider = "divider",
  Alias = "alias",
  Callout = "callout",
  CollectionView = "collection_view",
  CollectionViewPage = "collection_view_page",
  Image = "image",
}

export enum CollectionViewType {
  List = "list",
  Table = "table",
  Gallery = "gallery",
}

export enum PageCoverType {
  PageCover = "page_cover",
}

export enum TxnOperationCommands {
  Update = "update",
  ListRemove = "listRemove",
  Set = "set",
  ListBefore = "listBefore",
  ListAfter = "listAfter",
}
