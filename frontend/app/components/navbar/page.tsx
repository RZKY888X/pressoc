"use client";

import HamburgerMenu from "@/app/components/navbar/HamburgerMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLayout() {
  const pathname = usePathname();

  // Sembunyikan header hanya di /login
  if (pathname === "/login") return null;

  return (
    <div className='min-w-screen bg-[#0D1B2A] text-white p-6 font-sans'>
      <nav>
        <div className='flex justify-between items-center mb-6'>
          <Link href='#' className='text-2xl font-bold'>
            PRESSOC
          </Link>
          <HamburgerMenu />
        </div>
        <hr />
      </nav>
    </div>
  );
}
