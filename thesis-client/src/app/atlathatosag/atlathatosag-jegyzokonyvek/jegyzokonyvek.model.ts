export interface Jegyzokonyvek {
  _id: any;
  postType: string;
  committee: string;
  title: string;
  decisionDate: string;
  date: string;
  files: Array<File>;
}
