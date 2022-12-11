import { isPreview } from "@/libs/preview";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PreviewInfo } from "./PreviewInfo";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  const preview = isPreview();

  return (
    <div className="flex min-h-full flex-col justify-center">
      {preview && (
        <div className="bg-yellow-50 p-4 text-center text-slate-900">
          <PreviewInfo />
        </div>
      )}
      <div className="flex grow justify-center py-12">
        <div className="w-full max-w-2xl space-y-12 px-4">
          <Header />
          <main>{children}</main>
        </div>
      </div>
      <div className="flex justify-center border-t border-gray-600 bg-slate-800 py-12">
        <div className="w-full max-w-2xl px-4">
          <Footer />
        </div>
      </div>
    </div>
  );
}
