# tshare 🚀

A simple CLI tool that turns your terminal output into beautiful, sharable web pages.

## What is tshare? 🔍

tshare is like a "pastebin for your terminal" - it captures the output of any command and generates a link to a nicely formatted web page with syntax highlighting. No more sending plain text screenshots or struggling with formatting in chat apps!

## Installation 📦

```bash
# One-liner to get started
curl -o /usr/local/bin/tshare https://tshare.porgy-rulser.ts.net/tshare && chmod +x /usr/local/bin/tshare
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

### Want to host your own server?
Read [this post](https://mikkelrask.github.io) on [my blog](#) for all the details on how to run the server on your own machine/server and how to get it up and running 100% locally.

## Requirements 🧰

- Bash shell
- cURL for HTTPS requests
- Optional: `xclip` (Linux) or `pbcopy` (macOS) for automatic clipboard copying

## License 📄

MIT License

## Contributing 🤝

Issues and PRs welcome at [github.com/mikkelrask/terminal-share](https://github.com/mikkelrask/terminal-share)!

---

Made with 💙 by [mikkelrask](https://github.com/mikkelrask)

