import ThemeSwitcher from "./components/ThemeSwitcher";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb";

interface LayoutProps {
  children: React.ReactNode;
}

const Header: React.FC = (): JSX.Element => {
  const url = window.location.pathname;
  let pathname = url === "/" ? "Home" : url.split("/")[1];

  if (url !== "/") {
    pathname = url
      .split("/")[1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    pathname = "Home";
  }

  return (
    <header className="flex h-10 shrink-0 items-center gap-2 border-b px-4 w-full mb-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/">UILO</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>{pathname}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto -mr-2">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      <main className="container sm:max-w-xl mx-auto max-w-xs lg:max-w-4xl md:max-w-2xl xl:max-w-6xl">{children}</main>
    </>
  );
};

export default Layout;
