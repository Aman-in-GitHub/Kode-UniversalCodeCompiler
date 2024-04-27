import { ArrowDownToLine } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { useRef } from 'react';

export function FileName({ downloadCode }) {
  const inputRef = useRef('');

  const handleChange = () => {
    const nameOfFile = inputRef.current;

    downloadCode(nameOfFile);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-lighter active:scale-100 duration-300 scale-110">
          <ArrowDownToLine />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">
            Filename (Don't put extensions at the end)
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center">
          <div className="grid flex-1">
            <label htmlFor="link" className="sr-only">
              Name Of File
            </label>

            <input
              onChange={(e) => (inputRef.current = e.target.value)}
              className="outline-none h-full text-lg px-3 border focus:border-0 dark:text-white selection:bg-lighter py-2 resize-none focus:ring-lighter focus:ring-1 bg-transparent w-[95%] font-typo"
              placeholder="Enter your filename"
              type="text"
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button
                className="cursor-pointer scale-125 duration-200 active:scale-100 text-lighter"
                onClick={handleChange}
              >
                <ArrowDownToLine />
              </button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
