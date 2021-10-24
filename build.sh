#!/usr/bin/env bash

# Remove the old dist folder first
function removeDist() {
    echo "[BUILD] Remove the old dist folder..."
    rimraf dist
    echo "[BUILD] Finish removed the old dist folder"
}

# TSC Builder
function tscBuild() {
    # call removeDist to remove old dist folder first
    removeDist

    # start the timer
    T="$(date +%s%N)"
    echo "[BUILD] Start build the typescript file"

    # tsc command goes here
    tsc --build tsconfig.json

    # end the timer
    T="$(($(date +%s%N)-T))"
    S="$((T/1000000000))"
    M="$((T/10000000))"

    printf "[BUILD] Finish build, time to build: %02d:%02d:%02d.%03d\n" "$((S/3600%24))" "$((S/60%60))" "$((S%60))" "${M}"
}