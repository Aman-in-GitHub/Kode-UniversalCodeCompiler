import useLocalStorage from '@/hooks/useLocalStorage';

import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import logo from '/logo.svg';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

const schema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Email format is not valid'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters long')
});

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: 'fixthismail.com',
      password: 'test-password'
    },
    resolver: zodResolver(schema)
  });

  const navigate = useNavigate();

  const { setItem } = useLocalStorage('isLoggedIn');

  useEffect(() => {
    const isLogged = useLocalStorage('isLoggedIn').getItem();

    if (isLogged) {
      navigate('/', { replace: true });
    }
  }, []);

  const onSubmitForm = (data: unknown) => {
    setItem(data);
    navigate('/', { replace: true });
  };

  return (
    <header className="select-none bg-[url(/grid.svg)] dark:bg-[url(/darkGrid.svg)] lg:h-[88vh] h-[90vh]  overflow-hidden bg-[#fdfdfd] font-typo dark:bg-darkMode dark:text-white">
      <div className="lg:grid lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:h-full lg:col-span-5">
          <img
            alt="Kode Logo"
            src={logo}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <section className="flex items-center justify-center px-7 py-8 lg:col-span-7 lg:px-16 lg:py-12">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block" href="/">
              <span className="sr-only">Home</span>
            </a>

            <h1 className=" text-black dark:text-white text-[35px] font-primary font-bold md:text-5xl lg:text-9xl">
              Welcome to <span className="text-lighter">Kode</span>
            </h1>
            <form
              className="py-4 md:py-6 font-typo"
              noValidate
              onSubmit={handleSubmit(onSubmitForm)}
            >
              <div>
                <label
                  className="block font-bold mb-2 text-lg md:text-xl"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border-b dark:border-[#434343] appearance-none w-full py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline text-lg md:text-xl dark:bg-transparent dark:text-white"
                  autoComplete="current-email"
                  id="email"
                  type="email"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 font-semibold">
                  {errors.email.message}
                </span>
              )}

              <div className="mt-1">
                <label
                  className="block font-bold mb-2 text-lg md:text-xl"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border-b dark:border-[#434343] appearance-none w-full py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline text-lg md:text-xl dark:bg-transparent dark:text-white"
                  id="password"
                  type="password"
                  {...register('password')}
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <span className="text-red-500 font-semibold">
                  {errors.password.message}
                </span>
              )}
              <div>
                <button
                  className="bg-lighter hover:bg-lightest text-white font-bold py-2 px-4 rounded-sm text-lg md:text-xl duration-300 active:scale-95 mt-3 shadow"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </header>
  );
};

export default LogIn;
