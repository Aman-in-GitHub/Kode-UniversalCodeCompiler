import { Play } from 'lucide-react';

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

export function DialogInput({ handleInput, fetchCode }) {
  const inputRef = useRef('');

  const handleChange = () => {
    handleInput(inputRef.current);

    fetchCode();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Input</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">
            Stdin
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center">
          <div className="grid flex-1">
            <label htmlFor="link" className="sr-only">
              Standard Input
            </label>

            <textarea
              rows={1}
              onChange={(e) => (inputRef.current = e.target.value)}
              className="outline-none h-full text-lg px-3 border focus:border-0 dark:text-white selection:bg-lighter placeholder:text-sm placeholder:pt-[3px] py-1 resize-none focus:ring-lighter focus:ring-1 bg-transparent w-[95%]  font-typo"
              placeholder="Stdin Input (Separated by a newline)"
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button
                className="cursor-pointer scale-125 duration-200 active:scale-100 text-lighter"
                onClick={handleChange}
              >
                <Play />
              </button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
