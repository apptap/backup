set nocompatible

execute pathogen#infect()

"---------------------------        Plugins       ----------------------------
call plug#begin('~/.vim/plugged')
Plug 'ternjs/tern_for_vim'
Plug 'ervandew/supertab'
Plug 'Valloric/YouCompleteMe'
Plug 'rdnetto/YCM-Generator', { 'branch': 'stable' }
Plug 'https://github.com/rstacruz/sparkup.git'
Plug 'jelera/vim-javascript-syntax'
Plug 'pangloss/vim-javascript'
Plug 'nathanaelkane/vim-indent-guides'
" Required
Plug 'Shougo/unite.vim'
Plug 'devjoe/vim-codequery'

"Plug 'wookiehangover/jshint.vim'
Plug 'SirVer/ultisnips' | Plug 'honza/vim-snippets'
"Plug 'junegunn/vim-easy-align'
"Plug 'https://github.com/junegunn/vim-github-dashboard.git'
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
"Plug 'tpope/vim-fireplace', { 'for': 'clojure' }
"Plug 'https://github.com/tpope/vim-fugitive.git'
"Plug 'fatih/vim-go', { 'tag': '*' }
"Plug 'nsf/gocode', { 'tag': 'v.20150303', 'rtp': 'vim' }
"Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf', { 'do': './install --all' }
"Plug '~/my-prototype-plugin'
"Plug 'http://github.com/mattn/emmet-vim.git'
call plug#end()

"---------------------------      General Vim Settings     ----------------------------
" using Source Code Pro
set anti enc=utf-8
set guifont=Source\ Code\ Pro\ 11


" Bring up a quickfix window after grep has ran.
autocmd QuickFixCmdPost *grep* cwindow

if has("autocmd")
  " Enable file type detection.
  " Use the default filetype settings, so that mail gets 'tw' set to 72,
  " 'cindent' is on in C files, etc.
  " Also load indent files, to automatically do language-dependent indenting.
  filetype plugin indent on
  " ...
endif

" Leader - ( Spacebar )
let mapleader = " "

set backspace=2   " Backspace deletes like most programs in insert mode
set nobackup
set nowritebackup
set noswapfile    " http://robots.thoughtbot.com/post/18739402579/global-gitignore#comment-458413287
set history=50
set ruler         " show the cursor position all the time
set showcmd       " display incomplete command
set laststatus=2  " Always display the status line
set autowrite     " Automatically :write before running commands
set autoread      " Reload files changed outside vim
" Trigger autoread when changing buffers or coming back to vim in terminal.
au FocusGained,BufEnter * :silent! !

set cursorline    " highlight the current line
set visualbell    " stop that ANNOYING beeping

"Allow usage of mouse 
set ttyfast
set mouse=a
" set ttymouse=xterm2

" Make searching better
set gdefault      " Never have to type /g at the end of search / replace again
set ignorecase    " case insensitive searching (unless specified)
set smartcase
set hlsearch
nnoremap <silent> <leader>, :noh<cr> " Stop highlight after searching
set incsearch
set showmatch

set shiftround

" Display extra whitespace
set list listchars=tab:»·,trail:·,nbsp:·

" Make it obvious where 100 characters is
set textwidth=100
" set formatoptions=cq
set formatoptions=qrn1
set wrapmargin=0
set colorcolumn=+1

" Numbers
"set number
set numberwidth=5

" Open new split panes to right and bottom, which feels more natural
" set splitbelow
set splitright

" Auto resize Vim splits to active split
"set winwidth=104
set winheight=5
set winminheight=5
"set winheight=999

"HTML Editing
set matchpairs+=<:>

" Treat <li> and <p> tags like the block tags they are
let g:html_indent_tags = 'li\|p'

" ================ Scrolling ========================

set scrolloff=8         "Start scrolling when we're 8 lines away from margins
set sidescrolloff=15
set sidescroll=1

"Toggle relative numbering, and set to absolute on loss of focus or insert mode
"set rnu
function! ToggleNumbersOn()
    set nu!
    set rnu
endfunction
function! ToggleRelativeOn()
    set rnu!
    set nu
endfunction
"autocmd FocusLost * call ToggleRelativeOn()
"autocmd FocusGained * call ToggleRelativeOn()
"autocmd InsertEnter * call ToggleRelativeOn()
"autocmd InsertLeave * call ToggleRelativeOn()

"Use enter to create new lines w/o entering insert mode
nnoremap <CR> o<Esc>
"Below is to fix issues with the ABOVE mappings in quickfix window
autocmd CmdwinEnter * nnoremap <CR> <CR>
autocmd BufReadPost quickfix nnoremap <CR> <CR>

" Quicker window movement
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-h> <C-w>h
nnoremap <C-l> <C-w>l
" <c-h> is interpreted as <bs> in neovim
" This is a bandaid fix until the team decides how
" they want to handle fixing it...(https://github.com/neovim/neovim/issues/2048)
"nnoremap <silent> <bs> :TmuxNavigateLeft<cr>

" Navigate properly when lines are wrapped
nnoremap j gj
nnoremap k gk

" Use tab to jump between blocks, because it's easier
"nnoremap <tab> %
"vnoremap <tab> %

" Set spellfile to location that is guaranteed to exist, can be symlinked to
" Dropbox or kept in Git and managed outside of thoughtbot/dotfiles using rcm.
"set spellfile=$HOME/.vim-spell-en.utf-8.add

" Always use vertical diffs
set diffopt+=vertical

" Switch syntax highlighting on, when the terminal has colors
" Also switch on highlighting the last used search pattern.
"if (&t_Co > 2 || has("gui_running")) && !exists("syntax_on")
"  syntax on
"endif

" To disable a plugin, add it's bundle name to the following list
let g:pathogen_disabled = []


function! InsertStatuslineColor(mode)
  if a:mode == 'i'
    hi statusline guibg=Cyan ctermfg=6 guifg=Black ctermbg=0
  elseif a:mode == 'r'
    hi statusline guibg=Purple ctermfg=5 guifg=Black ctermbg=0
  else
    hi statusline guibg=DarkRed ctermfg=1 guifg=Black ctermbg=0
  endif
endfunction

au InsertEnter * call InsertStatuslineColor(v:insertmode)
au InsertLeave * hi statusline guibg=DarkGrey ctermfg=8 guifg=White ctermbg=15

" default the statusline to green when entering Vim
hi statusline guibg=DarkGrey ctermfg=8 guifg=White ctermbg=15

" Formats the statusline
set statusline=%f                           " file name
set statusline+=[%{strlen(&fenc)?&fenc:'none'}, "file encoding
set statusline+=%{&ff}] "file format
set statusline+=%y      "filetype
set statusline+=%h      "help file flag
set statusline+=%m      "modified flag
set statusline+=%r      "read only flag

" Puts in the current git status
    if count(g:pathogen_disabled, 'Fugitive') < 1   
        set statusline+=%{fugitive#statusline()}
    endif

" Puts in syntastic warnings

    if count(g:pathogen_disabled, 'Syntastic') < 1  
        set statusline+=%#warningmsg#
        set statusline+=%{SyntasticStatuslineFlag()}
        set statusline+=%*

        let g:syntastic_always_populate_loc_list = 1
        let g:syntastic_auto_loc_list = 1
        let g:syntastic_check_on_open = 1
        let g:syntastic_check_on_wq = 0
    endif

set statusline+=\ %=                        " align left
set statusline+=Line:%l/%L[%p%%]            " line X of Y [percent of file]
set statusline+=\ Col:%c                    " current column
set statusline+=\ Buf:%n                    " Buffer number
set statusline+=\ [%b][0x%B]\               " ASCII and byte code under cursor

" AUTOCOMMANDS - Do stuff

" Save whenever switching windows or leaving vim. This is useful when running
" the tests inside vim without having to save all files first.
au FocusLost,WinLeave * :silent! wa

" automatically rebalance windows on vim resize
autocmd VimResized * :wincmd =

"update dir to current file
autocmd BufEnter * silent! cd %:p:h

augroup vimrcEx
  autocmd!

  " When editing a file, always jump to the last known cursor position.
  " Don't do it for commit messages, when the position is invalid, or when
  " inside an event handler (happens when dropping a file on gvim).
  autocmd BufReadPost *
    \ if &ft != 'gitcommit' && line("'\"") > 0 && line("'\"") <= line("$") |
    \   exe "normal g`\"" |
    \ endif

  " Set syntax highlighting for specific file types
  "autocmd BufRead,BufNewFile *.md set filetype=markdown

  " autocmd BufRead *.jsx set ft=jsx.html
  " autocmd BufNewFile *.jsx set ft=jsx.html

  " Enable spellchecking for Markdown
  "autocmd FileType markdown setlocal spell

  " Automatically wrap at 100 characters for Markdown
  autocmd BufRead,BufNewFile *.md setlocal textwidth=100

  " Automatically wrap at 100 characters and spell check git commit messages
  autocmd FileType gitcommit setlocal textwidth=100
  autocmd FileType gitcommit setlocal spell

  " Allow stylesheets to autocomplete hyphenated words
  autocmd FileType css,scss,sass,less setlocal iskeyword+=-
augroup END

"--------------------------    Ctrl P jumping   ----------------------------
set runtimepath^=~/.vim/bundle/ctrlp.vim
"---------------------------------Tagman.vim----------------------------------
let g:tagman_ignores = ['node_modules', 'lib', '*.min.js', 'application']
"--------------------------    HTML tag jumping   ----------------------------
runtime macros/matchit.vim
"--------------------------- Solarized Colour Scheme -------------------------
" Solarized colour scheme.
"let g:solarized_termcolors=16
"colorscheme solarized
"set background=light
"call togglebg#map("<c-5>")
"----------------------------     add ctags    -------------------------------
autocmd FileType javascript set tags+=tags,javascript_tags;/
"--------------------------  Javascript indent  ------------------------------
autocmd FileType javascript setlocal expandtab sts=2 shiftwidth=4 tabstop=4
autocmd FileType javascript %retab
"---------------------------        Keymap        ----------------------------
"----------------------------    Remap ctags   -------------------------------
" go back a tag with backspace key.
noremap <C-T> :tabnew<CR> 
noremap <BS> <C-T>

" I think this is used by youcompleteme to include
" js lib completions. Or it's used by another plugin...
let g:used_javascript_libs = 'jquery,requirejs'

" make YCM compatible with UltiSnips (using supertab)
let g:ycm_key_list_select_completion   = ['<C-b>', '<Down>']
let g:ycm_key_list_previous_completion = ['<C-p>', '<Up>']
let g:SuperTabDefaultCompletionType    = '<C-b>'

" better key bindings for UltiSnips
let g:UltiSnipsListSnippets        = '<c-a>'
let g:UltiSnipsExpandTrigger       = "<tab>"
let g:UltiSnipsJumpForwardTrigger  = "<Right>"
let g:UltiSnipsJumpBackwardTrigger = "<Left>"

let g:SuperTabCrMapping = 0

" Crouton Clipboard
"noremap "*p :r !cat /home/chronos/.crouton-clipboard/data.txt<CR>\nvnoremap "*y :'<,'>w! /home/chronos/.crouton-clipboard/data.txt<CR>

" NERDTree
nmap <silent> <Leader>p :NERDTreeToggle<CR>
let g:NERDTreeDirArrows=0

" remap \w to be ctrl-w (for chromebooks where ctrl-w closes chrome tab), for
" switching windows.
"nnoremap <Leader>w <C-w>

"---------------------------- Jump to CSS Classes ------------------------------
function! JumpToCSS()
  let id_pos = searchpos("id", "nb", line('.'))[1]
  let class_pos = searchpos("class", "nb", line('.'))[1]

  if class_pos > 0 || id_pos > 0
    if class_pos < id_pos
      execute ":vim '#".expand('<cword>')."' **/*.less"
    elseif class_pos > id_pos
      execute ":vim '.".expand('<cword>')."' **/*.less"
    endif
  endif
endfunction

nnoremap <leader>] :call JumpToCSS()<CR>zz

set t_Co=256
syntax on
colorscheme distinguished
set background=dark
set background=light

        if has("cscope")
                set csprg=/usr/bin/cscope
                set csto=0
                set cst
                set nocsverb
                " add any database in current directory
                if filereadable("cscope.out")
                    cs add cscope.out
                " else add database pointed to by environment
                elseif $CSCOPE_DB != ""
                    cs add $CSCOPE_DB
                endif
                set csverb
                " Add basedir to cscope searches
                set csre
        endif

" Ignore Syntastic Errors
 let g:syntastic_html_tidy_ignore_errors = ['<svg> is not recognized',                               
             \ '<use> is not recognized',                                                            
             \ 'trimming empty <',                                                                   
             \ 'proprietary attribute "ng-',                                                         
             \ 'unescaped & which should be written as &amp',                                        
             \ 'proprietary attribute "sal-',                                                        
             \ '<sal-',                                                                              
             \ 'discarding unexpected </sal-',                                                       
             \ '<img> lacks "src" ',                                                                 
             \ 'discarding unexpected <svg>',                                                        
             \ 'discarding unexpected <use>',                                                        
             \ 'discarding unexpected </svg>',                                                       
             \ 'discarding unexpected </use>'                                                        
             \]

 " syntastic setting
 let g:syntastic_always_populate_loc_list = 0
 let g:syntastic_auto_loc_list = 0
 let g:syntastic_check_on_wq = 1
 let g:syntastic_check_on_open = 1
 let g:syntastic_enable_balloons = 1
 let g:syntastic_auto_jump = 0
 let g:syntastic_error_symbol = 'e:'
 let g:syntastic_warning_symbol = 'w:'
 if file_readable('.jshintrc')
     let g:syntastic_javascript_jshint_args = '--config .jshintrc'
 else
     let g:syntastic_javascript_jshint_args = '--config ~/.jshintrc'
 endif

 let g:syntastic_scss_checkers = ['scss_lint']
"" let g:syntastic_javascript_checkers = ['jscs','jshint']
 let g:syntastic_html_checkers = ['tidy']
 let g:syntastic_html_validator_parser = 'html5'
 let g:syntastic_java_javac_classpath = "./**/lib/*.jar"

 " tmux will only forward escape sequences to the terminal if surrounded by a DCS sequence           
 " http://sourceforge.net/mailarchive/forum.php?thread_name=AANLkTinkbdoZ8eNR1X2UobLTeww1jFrvfJxTMfKS
 if exists('$TMUX')                                                                                  
   let &t_SI = "\<Esc>Ptmux;\<Esc>\<Esc>]50;CursorShape=1\x7\<Esc>\\"                                
   let &t_EI = "\<Esc>Ptmux;\<Esc>\<Esc>]50;CursorShape=0\x7\<Esc>\\"                                
 else                                                                                                
   let &t_SI = "\<Esc>]50;CursorShape=1\x7"                                                          
   let &t_EI = "\<Esc>]50;CursorShape=0\x7"                                                          
 endif

