import Footer from '../../components/Footer/Footer';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pt-16 min-h-screen bg-bg">{children}</div>
      <Footer />
    </>
  );
}
