import { useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = useLocalStorage('isLoggedIn').getItem();

    if (!isLogged) {
      navigate('login', { replace: true });
    }
  }, []);

  return (
    <>
      <main className="bg-[#fdfdfd] font-typo dark:bg-darkMode px-4 md:px-12 lg:px-16 text-black dark:text-white select-none flex items-center justify-center flex-col h-[90vh] lg:h-[88vh] bg-[url(/grid.svg)] dark:bg-[url(/darkGrid.svg)] overflow-hidden pt-[-55px] lg:pt-0">
        <div className="font-primary">
          <h1 className="text-9xl font-black text-lighter text-center leading-[101px]">
            Kode
          </h1>
          <p className="pl-1">The right way</p>
        </div>
        <div className="font-typo md:text-center text-sm text-justify my-4 md:text-xl lg:px-[20%] font-thin">
          The one stop solution for your compiler needs! Need a compiler for{' '}
          <span className="font-semibold">C </span>
          we got you, need one for <span className="font-semibold">
            Rust
          </span>{' '}
          of course we have that too. For some reasons you need a compiler for
          <span className="font-semibold"> Brain F*ck</span> you know where to
          <span className="font-semibold"> kode</span> now.
        </div>
        <Link
          to="/compiler"
          className="flex gap-7 w-full md:w-min text-3xl bg-lighter px-7 my-3 hover:bg-lightest duration-500 active:scale-95 rounded-sm items-center justify-center py-5 shadow"
        >
          <span className="flex gap-2 items-center">
            <i className="devicon-kotlin-plain text-2xl"></i>
            <i className="devicon-lua-plain"></i>
            <i className="devicon-bitbucket-original"></i>
            <i className="devicon-erlang-plain"></i>
          </span>

          <span className="flex gap-2 items-center">
            <i className="devicon-nextjs-original"></i>
            <i className="devicon-ionic-original"></i>
            <i className="devicon-wordpress-plain"></i>
          </span>
        </Link>
      </main>
    </>
  );
};

export default Home;
