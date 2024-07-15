{
  pkgs ? import <nixpkgs> { },
}:

pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    poetry
    python312
    
    python312Packages.django

    python312Packages.black
    python312Packages.mypy
  ];
}

