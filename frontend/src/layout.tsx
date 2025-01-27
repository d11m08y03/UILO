interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <>
      <main className="">
        {children}
      </main>
    </>
  );
};

export default Layout;
