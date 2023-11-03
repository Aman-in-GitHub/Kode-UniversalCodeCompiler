import logo from '/logo.svg';

import { Github } from 'lucide-react';

import { ModeToggle } from '@/components/mode-toggle';

const Navbar = () => {
  return (
    <nav className="font-primary flex justify-between select-none md:px-12 lg:px-16 py-1 bg-[#fdfdfd] dark:bg-darkMode h-[10vh] lg:h-[12vh] bg-[url(/grid.svg)] dark:bg-[url(/darkGrid.svg)]">
      <a href="/" className="w-16 md:w-20">
        <img src={logo} alt="Kode Logo" />
      </a>
      <div className="flex items-center pr-2 gap-6 md:gap-8 lg:gap-10">
        <a
          href="https://github.com/Aman-in-GitHub/Kode-UniversalCodeCompiler"
          target="blank"
        >
          <Github className="text-light scale-[1.2] duration-500 hover:scale-[1.3] active:scale-[1.1] md:scale-[1.3] md:hover:scale-[1.4] md:active:scale-[1.2]" />
        </a>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
