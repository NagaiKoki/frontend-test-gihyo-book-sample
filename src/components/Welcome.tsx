type Props = {
  isLoggedIn: boolean;
};
export const Welcome = ({ isLoggedIn }: Props) => {
  return isLoggedIn ? <p>ようこそ！</p> : null;
};
