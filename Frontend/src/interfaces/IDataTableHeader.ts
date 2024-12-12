export default interface IDataTableHeader {
  title: string;
  key: string;
  sortable: boolean;
  align?: "start" | "center" | "end";
}
