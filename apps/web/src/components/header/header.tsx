type HeaderProps = {
  children?: React.ReactNode;
};
export const Header = ({ children }: HeaderProps) => {
  return <header className="flex">{children}</header>;
};
