import logo from '/logo.svg';
const Loader = () => {
  return (
    <>
      <div className="lg:h-[88vh] h-[90vh] overflow-hidden flex justify-center items-center px-2 bg-[#fdfdfd] dark:bg-darkMode bg-[url(/grid.svg)] dark:bg-[url(/darkGrid.svg)] select-none pt-[-55px] lg:pt-0">
        <div className="w-64 h-64 border-8 text-lighter text-4xl animate-spin border-t-lighter flex items-center justify-center border-t-dark_purple rounded-full">
          <img src={logo} alt="Loader" className="w-48" />
        </div>
      </div>
    </>
  );
};

export default Loader;
