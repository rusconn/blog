import { ReactNode } from "react";

import { isPreview } from "@/libs/preview";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PreviewInfo } from "./PreviewInfo";

export function Layout({ children }: { children: ReactNode }) {
  const preview = isPreview();

  return (
    <div className="flex min-h-full flex-col gap-y-12">
      {preview ? <PreviewInfo /> : <div className="invisible" />}
      <Header />
      <main className="flex grow justify-center">
        <div className="w-full max-w-3xl px-6">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
