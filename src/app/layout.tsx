import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Petsoft - Pet daycare software",
  description: "Petsoft is a pet daycare software that allows you to manage your pet daycare business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='font-raleway text-sm text-zinc-900 bg-[#E5E8EC] min-h-screen'>{children}</body>
    </html>
  );
}