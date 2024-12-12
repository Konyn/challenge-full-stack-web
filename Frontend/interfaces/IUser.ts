export default interface IUser {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}
