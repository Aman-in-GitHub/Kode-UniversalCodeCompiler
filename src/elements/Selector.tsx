import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import useLocalStorage from '@/hooks/useLocalStorage';

export function Selector({ array = [], name = '', handleChange }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const { getItem } = useLocalStorage('theme');
  const { getItem: getLang } = useLocalStorage('lang');

  React.useEffect(() => {
    if (name == 'theme') {
      const theme = getItem('theme') || '';
      setValue(theme);
    } else {
      const theme = getLang('lang') || '';
      setValue(theme);
    }
  }, []);

  React.useEffect(() => {
    if (!value) return;

    handleChange(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="dark:bg-darkMode dark:text-white rounded-none dark:hover:bg-[#131313] border-0 outline-none text-sm lg:text-base"
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[160px] lg:w-[180px] justify-between"
        >
          {value
            ? array.find((item) => item.value === value)?.label
            : `Select a ${name}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[160px] lg:w-[180px] p-0">
        <Command className="text-black dark:text-white">
          <CommandInput placeholder={`Search a ${name}`} />
          <CommandEmpty>No {name} found.</CommandEmpty>
          <CommandGroup>
            {array.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === item.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
