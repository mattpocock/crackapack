# Crack-A-Pack

A booster-opening simulator for the Magic: The Gathering community. Written in React, Javascript, HTML5 and CSS.

## File Structure

```
app
|
|   stylesheet__global.css
|   
|   components
|
|   |   App.js
|   |   |
|   |   layout
|   |   |   background.js
|   |   |   index.js
|   |   |   pile.js
|   |   |   stats.js
|   |   |   title.js
|   |   choosebooster
|   |   |   boosterselection.js
|   |   |   index.js
|   |   |   img
|   |   crack
|   |   |   card.js
|   |   |   index.js
|   |   |   loader.js
|   |   |   mainarea.js

```

### Layout

**index.js**

Where the magic happens. Contains all functions, data for various other modules, and renders the main layout for the site.

**background.js**

Module for rendering the background.

**pile.js**

Renders the piles either side of the 'crack' view.

**stats.js**

Renders the stat box to the top left of the 'crack' view.

**title.js**

Renders the title.

### Choosebooster

**index.js**

Renders the Booster selection view.

**boosterselection.js**

Does a lot. Fetches a list of sets from the magicthegathering.io API. Sorts those out and places them in columns. Also handles selection.

### Crack

**index.js**

Fetches the booster from the API and displays a layout for the cards based on the setCode passed to it.

**card.js**

Renders each card.

**loader.js**

Renders the loader.

**mainarea.js**

Displays the main card area. Also handles touch events.

### Styles

**stylesheet__global.css**

Contains the css for the whole project.