// alis1f/src/app/(marketing)/layout.tsx
import HeaderMarketing from "@/components/layout/HeaderMarketing";
import FooterMarketing from "@/components/layout/FooterMarketing";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderMarketing />
      {children}
      <FooterMarketing />
    </>
  );
}
