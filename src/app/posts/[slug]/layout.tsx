import { Layout as CommonLayout } from "@/app/common/layout";

function Layout({ children }: { children: React.ReactNode }) {
  return <CommonLayout>{children}</CommonLayout>;
}

export default Layout;
