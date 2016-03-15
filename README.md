exor
====

Installs [exor](https://github.com/motemen/exor) using npm.

Description
-----------

In general, when a `npm run` process gets killed (i.e. SIGTERM), its children are not killed unexepctedly and remain running.

`exor` wraps command execution and ensures child processes to be killed then whe parent one gets killed.

Usage
-----

    npm install [--save|--save-dev] @motemen/exor

    ./node_modules/.bin/exor <command> <args>... # eg. "exor npm run ..."
