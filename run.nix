{ pkgs ? import <nixpkgs> { } }:
with pkgs; mkShell {
  name = "node-dev-shell";
  # Attributes aren't interpolated by the shell, so $LD_LIBRARY_PATH ends up verbatim in your environment. You could remove it (if no users of this expr need it) or convert it to an export statement in shellHook, which runs as regular bash, including interpolation. https://stackoverflow.com/questions/69953573/nodejs-headless-gl-null-in-nixos/69953610?noredirect=1#comment123682825_69953610
  # https://github.com/albertgoncalves/ranim/blob/e59ee646c155fefba69b6f3b9aaad0402d360c2e/shell.nix#L37
  # test with `echo $LD_LIBRARY_PATH` after entering with nix-shell
  APPEND_LIBRARY_PATH = "${lib.makeLibraryPath [ libGL libuuid ]}";
  shellHook = ''
    export LD_LIBRARY_PATH="$APPEND_LIBRARY_PATH:$LD_LIBRARY_PATH"
  '';
}
