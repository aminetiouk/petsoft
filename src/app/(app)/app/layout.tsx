import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import BackgroundHeader from '@/components/background-header';

export default function Layout({ children }: { children: string }) {
  return (
    <main>
      <BackgroundHeader />

      <div className="max-w-[1050px] mx-auto">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </main>
  );
}
