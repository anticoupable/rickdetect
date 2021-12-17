##### [version française du README](/README.md)

# Rickdetect

Rickdetect is a tool that give you the ability to see if a link is a rick roll. For this, Rickdetect check the HTML code of the webpage (but if the information are not in the main file of the page, like YouTube Music, this will not work.)


## Needed to install

* A device on Windows, MacOS, Linux or ChromeOS (using Crostini)
* [nodejs and npm](https://nodejs.org) installed


## Install

Make sure to have [Node.js and npm](https://nodejs.org) is installed on your device then follow these steps in the good order (you will potentially need to restart your terminal / your device after the installation for use Rickdetect) :

* Download all necessary  (index.js, package.json, etc)
* Install the language file you want AND the language-fr.json (it is the default language)
* Open a terminal and go where you downloaded file.
* Make these two command...
```
$ npm i
.......
$ npm link
```


## Use

**Check for a rick roll :**
```
$ rickdetect --help

  Check if a link try to rick roll you.

  Use
    $ rickdetect

  Options
    --link -l <link>         URL (If not gived, check your clipboard)
    --config -c              Go into the Rickdetect config
    --version -v             Show the version used by Rickdetect
```

**Report a thing from the terminal :**
```
$ rickdetect-feedback

  Title of your request (1/3) : ...
  Description of your request (2/3) : ...
  How to contact you (3/3) : ...
```


## Changelog

*Only in the french README*


## Used for the creation

* [Meow](https://www.npmjs.com/package/meow) (CLI)
* [Node fetch](https://www.npmjs.com/package/node-fetch) (Get the code of a page)
* [Clipboardy](https://www.npmjs.com/package/clipboardy) (Access the clipboard)
* [Chalk](https://www.npmjs.com/package/chalk) (Put color in the terminal)
* [Prompt](https://www.npmjs.com/package/prompt) (Ask for text in the config)
* [Hastebin.js](https://www.npmjs.com/package/hastebin.js) (Option to post the code of a page on Hastebin and give you the link)
* [conf](https://www.npmjs.com/package/conf) (Save configuration)
* [terminal-kit](https://www.npmjs.com/package/terminal-kit) (Color and ask for text in the feedback)

* [Hastebin edit](https://hasteb.herokuapp.com)
* Private feedback API (bruh the api doesn't even work anymore)


## Example

* https://www.youtube.com/watch?v=dQw4w9WgXcQ
* https://youtu.be/xaazUgEKuVA
* https://is.gd/OiqSNs
* http://bit.do/not-rick


## Licence

ISC © [Johan](https://johanstickman.com)
