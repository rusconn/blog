import { isPreview } from "@/libs/preview";
import { BackToHome } from "./BackToHome";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PreviewInfo } from "./PreviewInfo";

type Props = {
  children: React.ReactNode;
  home?: boolean;
};

export const Layout = ({ children, home }: Props) => {
  const preview = isPreview();

  return (
    <>
      {preview && (
        <div className="sticky top-0 z-10 bg-yellow-50 p-4 text-center">
          <PreviewInfo />
        </div>
      )}
      <div className="mx-auto mt-12 mb-24 max-w-2xl px-4">
        <Header home={home} />
        <main>{children}</main>
        {!home && (
          <div className="mt-16">
            <BackToHome />
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};
