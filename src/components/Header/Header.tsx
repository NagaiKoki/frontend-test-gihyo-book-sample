type Props = {
  title?: string;
};

export const Header = ({ title = 'My App' }: Props) => {
  return (
    <header className="header">
      <div className="header-logo">{title}</div>
      <nav className="header-nav">
        <a href="/">ホーム</a>
        <a href="/contact">お問い合わせ</a>
        <a href="/login">ログイン</a>
      </nav>
    </header>
  );
};
