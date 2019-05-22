# Hyphens CKEditor5 plugin for Neos CMS

## Introduction

This package provides buttons to insert soft hyphens while inline editing 
which can be used in Neos CMS with the Neos.Ui 2+.

This package is still experimental!

Currently only soft hyphens can be inserted, but word breaks are also planned.

## Example           

In the backend this plugin will add the option to add soft hyphens. They will look like this while editing:

    TODO: Add screenshot       
       
And in the frontend result in the desired breaks:

    TODO: Add screenshot

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
