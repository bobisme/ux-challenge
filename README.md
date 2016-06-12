# Front-end challenge.

*Completed by Bob*

## Design

Fun. The requirements were very unspecified when it came to "responsive
experience," so I made some assumptions and tested for all the normal
breakpoints from wide browsers to vertical and horizontal tablets to iPhones.

-   The layout remains 2-column until the window is smaller than the width of
    the iPad (768px) then it becomes 1-column.
-   I kept the login button width the sidebar content when the layout re-flows,
    so it is below the main content, which may not be ideal, but I did not see
    a guide in the specification.
-   The menu becomes 2-lines in the medium and smaller layouts, with all the
    page navigation below the logo.

Also there were no specifications about animations or transitions... so I added
some of those too.  Natural movement and transitions are becoming a large part
of UX today. But none of these are working in IE9, because it doesn't support
CSS transitions.

-   The rates are loaded asynchronously then faded/expanded into the content of
    the page.
-   The tabs will expand/shrink as they are selected.
-   The tab content will fade and the container will grow/shrink to the size of
    the next content.
-   The dark background of the modal fades in and the modal slides in from the
    top.

Tested on IE10, IE9 (rendindering mode in IE10), Chrome 51, Safari 8, Safari on
iOS 9, and Firefox 48.

## Code

**Everything** was hand coded by me. I used sass and grunt to build the CSS.
Javascript was all native. I did not use jQuery because it's not really
necessary anymore. I tried to use everything modern that IE9 would support.
That is none of the really cool stuff, but some of the useful stuff like
`querySelector` and `Array.map`.

## Comments

It would be great if the 2 images were already sliced out, then Photoshop
wouldn't really be necessary at all.

It would really great if those images were already SVGs since they're simple
vectors anyway.

I couldn't really pick out a vertical/typographical rhythm/grid.

A body font of 16px instead of 14px would be easier to read on higher res
screens. Fills the space better on desktops.

The buttons should be "Log In" instead of "Login", where "login" is the noun
referring to your login information and to "log in" is the action.

## Dev setup (requires node)

### Install dependencies

    npm install

### Start dev server with live reload

    npm run watch
