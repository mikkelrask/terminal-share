# tshare 🚀

A simple CLI tool that turns your terminal output into beautiful, sharable web pages.

## What is tshare? 🔍

tshare is like a "pastebin for your terminal" - it captures the output of any command and generates a link to a nicely formatted web page with syntax highlighting. No more sending plain text screenshots or struggling with formatting in chat apps!

## Installation 📦

```bash
# One-liner to get started
curl -o ~/.local/bin/tshare https://raw.githubusercontent.com/mikkelrask/terminal-share/refs/heads/main/tshare && chmod +x ~/.local/bin/tshare
```
If it errors out about _"No such file or directory"_, your system system probably don't use the `.local` directory, so you can either create the directory with `mkdir -pv ~/.local/bin` and add it to your path with `PATH="/home/your-user-name/.local/bin:$PATH"` or run the alternate install command, however this will require elevated priveliges, like `sudo`.
```
sudo curl -o /usr/local/bin/tshare https://raw.githubusercontent.com/mikkelrask/terminal-share/refs/heads/main/tshare && sudo chmod /usr/local/bin/tshare
```

## How to use it 👩‍💻

Just prefix any command with `tshare`:

```bash
# Share directory listing
tshare ls -la

# Share with specific syntax highlighting
tshare -s python script.py

# Share git diff
tshare git diff HEAD~1

# Share output silently (only show the URL)
tshare -q ls -la
```

Once the command completes, tshare will:
1. Generate a link to a web page with your command output
2. Copy the link to your clipboard automatically
3. Show you the link in the terminal

## Why tshare? 💡

- **Preserves formatting** - Code and command output look exactly as intended
- **Quick sharing** - No need to copy/paste text or take screenshots
- **Context-aware** - Shows the command, directory, and hostname for reference
- **Syntax highlighting** - Makes output more readable
- **Just works** - No accounts, no configuration, no hassle
- **Quiet mode** - When you only need the share link without seeing the command output
- **Self hostable** - _Bring your own infrastructure_ for more privacy i.e in a work environment

### Example output
[![The tshare source code shown in tshare](https://github.com/mikkelrask/terminal-share/blob/main/img/screenshot.png)](https://terminal-share.pages.dev/0f9804b0)

## Requirements 🧰

- Bash shell
- cURL for HTTPS requests
- Optional: `xclip` (Linux X11), `wl-copy` (Linux Wayland) or `pbcopy` (macOS) for automatic clipboard copying

## License 📄

The complete `tshare` project is licensed under the Open Source [BEER-WARE Rev 42 licence](https://github.com/mikkelrask/terminal-share/blob/main/LICENSE)

## Contributing 🤝

Issues and PRs welcome at [github.com/mikkelrask/terminal-share](https://github.com/mikkelrask/terminal-share)!

---

Made with 💙 by [mikkelrask](https://mikkelrask.github.io)
