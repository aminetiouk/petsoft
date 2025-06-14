import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import BackgroundHeader from '@/components/background-header';

export default function Layout({ children }: { children: string }) {
  return (
    <main>
      <BackgroundHeader />

      <div className="flex flex-col min-h-screen max-w-[1050px] mx-auto px-4">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </main>
  );
}
