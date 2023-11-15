import { useEffect, useRef, useState } from 'react';

import axios from 'axios';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Copy, Loader2, Play } from 'lucide-react';

import { Selector } from '@/elements/Selector';

import { useToast } from '@/components/ui/use-toast';

import useLocalStorage from '@/hooks/useLocalStorage';

import AceEditor from 'react-ace';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

// Languages

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-cobol';
import 'ace-builds/src-noconflict/mode-kotlin';
import 'ace-builds/src-noconflict/mode-dart';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-objectivec';
import 'ace-builds/src-noconflict/mode-swift';
import 'ace-builds/src-noconflict/mode-fortran';

// Editor Configs

import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/snippets/python';
import 'ace-builds/src-noconflict/snippets/c_cpp';
import 'ace-builds/src-noconflict/snippets/java';
import 'ace-builds/src-noconflict/snippets/ruby';
import 'ace-builds/src-noconflict/snippets/rust';
import 'ace-builds/src-noconflict/snippets/golang';
import 'ace-builds/src-noconflict/snippets/csharp';
import 'ace-builds/src-noconflict/snippets/cobol';
import 'ace-builds/src-noconflict/snippets/kotlin';
import 'ace-builds/src-noconflict/snippets/dart';
import 'ace-builds/src-noconflict/snippets/sql';
import 'ace-builds/src-noconflict/snippets/objectivec';
import 'ace-builds/src-noconflict/snippets/swift';
import 'ace-builds/src-noconflict/snippets/fortran';

import 'ace-builds/src-noconflict/ext-inline_autocomplete';

// Dark Theme

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github_dark';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-clouds_midnight';
import 'ace-builds/src-noconflict/theme-solarized_dark';

//Light Theme

import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-clouds';

import { DialogInput } from '@/elements/DialogInput';
import { FileName } from '@/elements/FileName';
import { useNavigate } from 'react-router-dom';

const languages = [
  {
    value: 'c',
    label: 'C'
  },
  {
    value: 'cpp',
    label: 'C++'
  },
  {
    value: 'java',
    label: 'Java'
  },
  {
    value: 'python3',
    label: 'Python'
  },
  {
    value: 'nodejs',
    label: 'NodeJS'
  },
  {
    value: 'ruby',
    label: 'Ruby'
  },
  {
    value: 'go',
    label: 'Go'
  },
  {
    value: 'csharp',
    label: 'C#'
  },
  {
    value: 'rust',
    label: 'Rust'
  },
  {
    value: 'cobol',
    label: 'COBOL'
  },
  {
    value: 'kotlin',
    label: 'Kotlin'
  },
  {
    value: 'dart',
    label: 'Dart'
  },
  {
    value: 'sql',
    label: 'SQL'
  },
  {
    value: 'objc',
    label: 'Objective C'
  },
  {
    value: 'swift',
    label: 'Swift'
  },
  {
    value: 'fortran',
    label: 'Fortran'
  },
  {
    value: 'brainfuck',
    label: 'Brainf*ck'
  }
];

const themes = [
  {
    value: 'monokai',
    label: 'Monokai'
  },
  {
    value: 'github_dark',
    label: 'Github Dark'
  },
  {
    value: 'dracula',
    label: 'Dracula'
  },
  {
    value: 'clouds_midnight',
    label: 'Midnight Clouds'
  },
  {
    value: 'solarized_dark',
    label: 'Solarized Dark'
  },
  {
    value: 'github',
    label: 'Github'
  },
  {
    value: 'chrome',
    label: 'Chrome'
  },
  {
    value: 'clouds',
    label: 'Clouds'
  },
  {
    value: 'solarized_light',
    label: 'Solarized Light'
  },
  {
    value: 'xcode',
    label: 'Xcode'
  }
];

function Compiler() {
  const { setItem, getItem } = useLocalStorage('theme');

  const { toast } = useToast();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { setItem: setLang, getItem: getLang } = useLocalStorage('lang');
  const { setItem: setWarn, getItem: getWarn } = useLocalStorage('warn');

  const [scriptLang, setScriptLang] = useState('');
  const [theme, setTheme] = useState('');
  const [language, setLanguage] = useState('');

  const consoleRef = useRef(null);
  const scriptRef = useRef('');
  const stdinRef = useRef('');
  const textAreaRef = useRef(null);

  useEffect(() => {
    const isLogged = useLocalStorage('isLoggedIn').getItem();

    if (!isLogged) {
      navigate('/login', { replace: true });
    }

    function updateWindowDimensions() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateWindowDimensions);

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  useEffect(() => {
    const theme = getItem('theme') || '';
    setTheme(theme);

    const lang = getLang('lang') || '';
    setScriptLang(lang);

    if (lang == 'nodejs') {
      setLanguage('javascript');
    } else if (lang == 'python3') {
      setLanguage('python');
    } else if (lang == 'c' || lang == 'cpp') {
      setLanguage('c_cpp');
    } else if (lang == 'objc') {
      setLanguage('objectivec');
    } else {
      setLanguage(lang);
    }

    if (getWarn('warn') == 'Shown') {
      toast({
        title: 'Thank You For Your Patience 💚',
        description:
          'Compilation maybe a bit slow on the first try but after than it runs smoothly'
      });

      setWarn('Shown');
    }
  }, []);

  const copyCode = () => {
    if (!scriptRef.current) {
      toast({
        description: 'No code to copy',
        variant: 'destructive'
      });
      return;
    }
    const code = scriptRef.current;

    if (!navigator.clipboard) {
      const textarea = document.createElement('textarea');

      textarea.value = code;

      document.body.appendChild(textarea);

      textarea.select();

      document.execCommand('copy');

      document.body.removeChild(textarea);

      toast({
        description: 'Code Copied',
        variant: 'default'
      });
    } else {
      navigator.clipboard.writeText(code);
      toast({
        description: 'Code Copied',
        variant: 'default'
      });
    }
  };

  function getCode(val) {
    let ext = '';

    switch (val) {
      case 'java':
        ext = 'java';
        break;
      case 'c':
        ext = 'c';
        break;
      case 'cpp':
        ext = 'cpp';
        break;
      case 'python3':
        ext = 'py';
        break;
      case 'nodejs':
        ext = 'js';
        break;
      case 'ruby':
        ext = 'rb';
        break;
      case 'go':
        ext = 'go';
        break;
      case 'csharp':
        ext = 'cs';
        break;
      case 'rust':
        ext = 'rs';
        break;
      case 'cobol':
        ext = 'cobol';
        break;
      case 'kotlin':
        ext = 'kt';
        break;

      case 'dart':
        ext = 'dart';
        break;

      case 'sql':
        ext = 'sql';
        break;

      case 'objc':
        ext = 'm';
        break;

      case 'swift':
        ext = 'swift';
        break;

      case 'fortran':
        ext = 'f';
        break;

      case 'brainfuck':
        ext = 'bf';
        break;

      default:
        ext = 'txt';
    }

    return ext;
  }

  const { data, isFetching, refetch, isError, error } = useQuery({
    queryKey: ['CompiledResult'],
    queryFn: executeCode,
    enabled: false
  });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  async function executeCode() {
    const script = scriptRef.current;
    const isValid = script.trim().length > 0;

    if (!isValid) {
      toast({
        description: 'No Code To Run',
        variant: 'destructive'
      });
      return null;
    }

    try {
      const requestData = {
        script,
        language: scriptLang,
        stdin: stdinRef.current,
        versionIndex: '0'
      };

      const response = await axios.post(
        `https://kode-by-aman.onrender.com/execute`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  function handleLanguageChange(value) {
    setScriptLang(value);

    setLang(value);

    if (scriptRef.current) {
      scriptRef.current = '';
    }

    if (consoleRef.current) {
      consoleRef.current.value = '';
    }

    if (textAreaRef.current) {
      textAreaRef.current.value = '';
    }

    if (stdinRef.current) {
      stdinRef.value = '';
    }

    if (value == 'nodejs') {
      setLanguage('javascript');
    } else if (value == 'python3') {
      setLanguage('python');
    } else if (value == 'c' || value == 'cpp') {
      setLanguage('c_cpp');
    } else if (value == 'objc') {
      setLanguage('objectivec');
    } else {
      setLanguage(value);
    }

    queryClient.setQueryData(['CompiledResult'], null);
  }

  function handleStdinChange(val) {
    stdinRef.current = val;
  }

  function handleThemeChange(value) {
    setItem(value);
    setTheme(value);
  }

  function handleRun() {
    refetch();
  }

  function downloadCode(val) {
    const code = scriptRef.current;

    const regex = /\S/g;
    const isValid = regex.test(code);

    if (!isValid) {
      toast({
        description: 'No Code To Download',
        variant: 'destructive'
      });
      return null;
    }

    const langCode = getCode(scriptLang);

    const fileName = `${val.replace(/ /g, '')}.${langCode}`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);

    toast({
      description: `Downloaded ${fileName}`,
      variant: 'default'
    });
  }

  return (
    <div className="h-[90vh] lg:h-[88vh] overflow-hidden bg-[#fdfdfd] dark:bg-darkMode bg-[url(/grid.svg)] dark:bg-[url(/darkGrid.svg)] font-typo grid lg:grid-cols-3">
      <div className="row-span-2 lg:row-span-1 lg:col-span-2 flex flex-col relative">
        <div className="border-t-2 flex justify-between items-center">
          <div className="flex items-center justify-between w-full lg:justify-start select-none">
            <Selector
              name="language"
              array={languages}
              handleChange={(value) => handleLanguageChange(value)}
            />
            <button className="lg:hidden w-10">
              <FileName downloadCode={(val) => downloadCode(val)} />
            </button>
            <Selector
              name="theme"
              array={themes}
              handleChange={(value) => handleThemeChange(value)}
            />
          </div>
          <div className="hidden lg:flex items-center gap-8 h-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="flex items-center">
                  <button>
                    <FileName downloadCode={(val) => downloadCode(val)} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download Code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <textarea
              rows={1}
              ref={textAreaRef}
              onChange={(e) => handleStdinChange(e.target.value)}
              className="outline-none h-full text-lg pl-3 pr-1 border-lightest border-2 border-t-0 border-r-0 dark:bg-darkMode dark:text-white selection:bg-lighter placeholder:text-base w-80 resize-none pt-1 placeholder:pt-1 "
              placeholder="Stdin Input (Separated by a newline)"
            />
          </div>
        </div>

        <div className="w-full flex-1 relative">
          <AceEditor
            mode={language}
            theme={theme}
            fontSize="16px"
            wrapEnabled
            enableBasicAutocompletion
            enableSnippets
            enableLiveAutocompletion
            value={scriptRef.current}
            onChange={(e) => (scriptRef.current = e)}
            width="100%"
            height="100%"
            showPrintMargin={false}
            readOnly={language ? false : true}
            placeholder={
              language
                ? `Write your ${scriptLang} code here`
                : 'Select a language'
            }
          />

          <button
            className="absolute right-2 top-2 lg:top-4 lg:right-4 z-50 text-lighter active:scale-75 duration-300 scale-[.9]"
            onClick={copyCode}
          >
            <Copy />
          </button>
        </div>
      </div>

      <div className="relative border-2 border-lightest">
        {screenWidth < 1024 ? (
          <button className="absolute bg-lighter duration-300 hover:bg-lightest active:scale-[.95] z-50 h-12 w-12 rounded-full flex items-center justify-center translate-x-[-50%] left-[50%] top-[-1.5rem]">
            <span className="z-100 w-12 h-12 flex items-center justify-center opacity-0">
              <DialogInput
                fetchCode={() => refetch()}
                handleInput={(val) => handleStdinChange(val)}
              />
            </span>
            <Play className="scale-[1.2] absolute top-[50%] left-[55%] translate-y-[-50%] translate-x-[-50%] z-10 pointer-events-none" />
          </button>
        ) : (
          <button
            className="absolute bg-lighter duration-300 hover:bg-lightest active:scale-[.95] lg:top-[50%] lg:translate-y-[-50%] lg:left-[-2rem] z-50 h-12 w-12 lg:h-16 lg:w-16 rounded-full flex items-center justify-center translate-x-[-50%] left-[50%] top-[-1.5rem] lg:translate-x-0"
            onClick={handleRun}
          >
            <Play className="scale-[1.3] lg:scale-[1.5] pl-1 text-white dark:text-black" />
          </button>
        )}

        <textarea
          readOnly
          className="dark:bg-darkMode outline-none resize-none h-full w-full z-10 text-black dark:text-white pt-7 px-2 selection:bg-lighter text-base font-mono"
          value={
            isFetching
              ? ''
              : data
              ? data.output +
                '\n' +
                `Compiled in ${data.cpuTime ? data.cpuTime : 0}s`
              : isError
              ? error.message
              : ''
          }
          ref={consoleRef}
        />
        <span className="absolute pt-1 left-2 text-lighter font-semibold text-lg select-none lg:w-[95.4%] w-[97.8%] bg-[#fdfdfd] dark:bg-darkMode">
          Console
        </span>
        {isFetching ? (
          <span className="absolute top-[50%] left-[50%] scale-[2] text-lighter">
            <Loader2 className="animate-spin" />
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default Compiler;
