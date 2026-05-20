import Link from 'next/link';

export const metadata = {
  title: 'Blog | Dave Miranda',
  description: 'Thoughts and articles by David Miranda — Full Stack Developer.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="fixed top-0 left-0 w-screen z-20 h-14 bg-gray-900 bg-opacity-90 backdrop-blur-md flex items-center px-6 gap-6">
        <Link href="/" className="text-white font-bold text-lg tracking-widest hover:text-green-300 transition">
          DÆV
        </Link>
        <Link href="/#about" className="text-gray-300 text-sm hover:text-white transition">About</Link>
        <Link href="/#skills" className="text-gray-300 text-sm hover:text-white transition">Skills</Link>
        <Link href="/#projects" className="text-gray-300 text-sm hover:text-white transition">Projects</Link>
        <Link href="/#contact" className="text-gray-300 text-sm hover:text-white transition">Contact</Link>
        <Link href="/blog" className="text-green-400 text-sm font-semibold hover:text-green-300 transition ml-auto">
          /blog
        </Link>
      </nav>
      <div className="pt-14">
        {children}
      </div>
    </>
  );
}
