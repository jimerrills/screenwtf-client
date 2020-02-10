# Screen.wtf
This is a screenshot client created to make use of the domain Screen.wtf, I thought I'd add it to github for public usage.

The code isn't great, but when you have code this minimal it doesn't really require much else.

I've made use of the system default screenshotting tools on operating systems:
* Windows: `snipping-tool /clip`
* Linux: `gnome-screenshot -ac`
* MacOS/Darwin: `screencapture -ic

## Download
You can download the binaries from https://screen.wtf

## Compiling
Make sure you've got `nodejs`, `npm` and `yarn` installed.

* Clone the repo into a directory of your choice
* Go into the directory and `npm install`
* Once done, run `npm run make`, this will run electron-forge and compile for your current OS
