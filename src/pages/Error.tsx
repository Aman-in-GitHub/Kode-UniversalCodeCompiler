import error from '/error.svg';

const Error = () => {
  return (
    <div className="h-[90vh] lg:h-[88vh] overflow-hidden flex justify-center items-center px-2 bg-[#fdfdfd] dark:bg-darkMode bg-[url(/grid.svg)] dark:bg-[url(/darkGrid.svg)]">
      <img src={error} alt="404 Error" className="w-76 md:w-[600px]" />
    </div>
  );
};

export default Error;
