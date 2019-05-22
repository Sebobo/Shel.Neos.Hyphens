# Hyphens CKEditor5 plugin for Neos CMS

## Introduction

This package provides buttons to insert soft hyphens while inline editing 
which can be used in Neos CMS with the Neos.Ui 2+.

This package is still experimental!

Currently only soft hyphens can be inserted, but word breaks are also planned.

## Example           

In the backend this plugin will add the option to add soft hyphens. They will look like this while editing:

![Visible hyphens while editing](Documentation/neos-backend-hyphens.jpg)       
       
And in the frontend will convert this:

![Unwanted hyphenation without soft hyphens](Documentation/neos-frontend-before.jpg)

Into this:

![Expected hyphenation](Documentation/neos-frontend-after.jpg)

And in action:

![Expected hyphenation](Documentation/example.gif)

## Installation

Run this in your site package

    composer require --no-update shel/neos-hyphens
    
Then run `composer update` in your project directory.

## How to use

Enable it for a node with editable text like this:

    'Neos.NodeTypes:Text':
      properties:
        text:
          ui:
            inline:
              editorOptions:
                hyphens: true

## Contributions

Contributions are very welcome! 

Please create detailed issues and PRs.
