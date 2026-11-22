import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FBFE] p-4 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-6xl font-black text-[#1769AA]">404</h1>
        <h2 className="text-xl font-bold text-[#0B1220]">Page Not Found</h2>
        <p className="text-slate-600 text-xs">
          The requested admin page does not exist or has been moved.
        </p>
        <Link
          href="/admin"
          className="inline-block px-4 py-2 rounded-lg bg-[#1769AA] text-white text-xs font-bold uppercase tracking-wider shadow"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
