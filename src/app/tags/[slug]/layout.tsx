import { Layout as CommonLayout } from "@/app/common/layout";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <CommonLayout>{children}</CommonLayout>
);

export default Layout;
