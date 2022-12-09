import { Layout as CommonLayout } from "@/app/common/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CommonLayout>{children}</CommonLayout>;
}
