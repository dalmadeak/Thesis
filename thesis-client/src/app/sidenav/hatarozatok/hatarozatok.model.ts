export interface Hatarozat {
  _id: any;
  postType: string;
  committee: string;
  number: string;
  decisionDate: string;
  content: string;
  mandate: number;
  vote: string;
  date: string;
  files: Array<File>;
}
