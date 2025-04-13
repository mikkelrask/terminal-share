{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "tshare"; # Renamed per project
  
  buildInputs = with pkgs; [
    nodejs_23
    nodePackages.tailwindcss
    typescript-language-server
  ];

  shellHook = ''
    # Shell commands to execute when entering shell
    
    export PROJECT="$(basename $PWD)"
    export PATH="$PATH:$PWD/node_modules/.bin"
    export NPM_PACKAGES="$PWD/node_modules"
    export BROWSER="flatpak run app.zen_browser.zen"
    tmux new-session -d -s "$PROJECT"
    tmux split-window -v -t "$PROJECT"
    tmux send-keys -t "$PROJECT":1.2 'node server.js' Enter
    tmux break-pane -t "$PROJECT":2
    tmux send-keys -t "$PROJECT":1.1 'nvim ' Enter
    tmux attach-session -t "$PROJECT"
  '';
}

