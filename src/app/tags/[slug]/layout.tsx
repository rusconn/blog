import { Layout as CommonLayout } from "@/app/common/layout";
import { isPreview } from "@/libs/preview";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const preview = isPreview();

  return <CommonLayout preview={preview}>{children}</CommonLayout>;
};

export default Layout;
