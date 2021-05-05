##### [version française du README](/README.md)

# Rickdetect

Rickdetect is a tool that give you the ability of see if a link is a rick roll. For this, Rickdetect check the HTML code of the webpage (but if the information are not in the main file of the page, like YouTube Music, this will not work.)


## Needed to install

* A device on Windows, MacOS, Linux ou ChromeOS (With Crostini)
* [nodejs and npm](https://nodejs.org) installed


## Install

Make sure to have [Node.js and npm](https://nodejs.org) is installed on your device then follow theses steps in the good order (you will potentially need to restart your terminal / your device after the installation for use Rickdetect) :

* Download all files neecesary (index.js, package.json, etc)
* Install the language file you want AND the language-fr.json (it is the default language)
* Open a terminal and go where you downloaded file.
* Make these two command...
```
$ npm i
.......
$ npm link
```


## Use

```
$ rickdetect --help

  Check if a link try to rick roll you.

  Use
    $ rickdetect

  Options
    --link -l <link>         URL (If not gived, check your clipboard)
    --config -c              Go into the Rickdetect config
    --version -v             Show the version used by Rickdetect
```


## Changelog

*Only in the french README*


## Utilisé pour la création

* [Meow](https://www.npmjs.com/package/meow) (CLI)
* [Node fetch](https://www.npmjs.com/package/node-fetch) (Get the code of a page)
* [Clipboardy](https://www.npmjs.com/package/clipboardy) (Access the clipboard)
* [Chalk](https://www.npmjs.com/package/chalk) (Put color in the terminal)
* [Prompt](https://www.npmjs.com/package/prompt) (Ask for text in the config)
* [Hastebin.js](https://www.npmjs.com/package/hastebin.js) (Option to post the code of a page on Hastebin and give you the link)
* [conf](https://www.npmjs.com/package/conf) (Save configuration)

* [Hastebin edit](https://hasteb.herokuapp.com)


## Exemple

* https://www.youtube.com/watch?v=dQw4w9WgXcQ
* https://youtu.be/xaazUgEKuVA
* https://is.gd/OiqSNs
* http://bit.do/not-rick


## Licence

ISC © [Johan](https://johan-perso.glitch.me)