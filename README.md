# Get started

To run this project you need to install the pnpm for managing packages

after that you can run

```bash
pnpm install
```

to add projects dependencies.

after that by running `pnpm dev` both backend and frontend projects start on your local machine.

frontend project will be available on:

```txt
http://localhost:5173
```

backend project will be available on:

```txt
http://localhost:3000
```

## Architecture

For this project we have used mono-repo architecture for managing different projects and packages that we have.

we have 2 apps and 2 packages:

* web: this one is our frontend project and the most important part
* api: this is a really simple express application to mock our data
* services: this package is an SDK contains all the services separately from frontend you only need to pass base url on run time and it works on every client
* shared-types: as we have api and web applications separately, it is crucial to have shared types in both projects in some package it will make changes in the future a lot easier and avoids so many bugs

This architecture is really cool as we can easily change backend, client or even services without causing problem to other parts(as the task mentioned the backend is not ready yet)!

also having separated packages helped us to keep responsibilities isolated and scalable for future development.

### Web applications architecture

for our web application I chose feature driven development because it is not a really big project but it has critical features, which can scale, so this architecture works really fine here for this part of work.

structure:

```txt
/app
   /providers
   /router
   /styles
/features
   /[featureName]
      /api
      /components
      /hooks
      /store
      /types
/pages
/shared
   /api
   /components
   /config
   /lib
/test
```

this structure helped us to:

* isolate business logic from shared ui
* make features independent and scalable
* avoid huge global folders
* keep reusable parts inside shared directory
* keep route level components simple and readable

### API architecture

the api application is intentionally simple because backend services were still in development process based on the task description.

instead of over engineering backend side, we mocked stable in-memory data structures to simulate real world api behavior.

we used:

* express for server
* in-memory persistent maps
* random map generation utility
* separated route handlers
* shared types package for type safety between frontend and backend

one important point was keeping maps persistent in memory, because rendering random data on every request could break frontend consistency and react-query invalidation flow.

## Project stack

The web project implemented using `react library` + `vite`

the main language we used here was `typescript`

* routing: react-router-dom
* virtualization: react-window (to handle large scale dom nodes for seat-selection feature)
* server state: react query
* validation: zod
* linting and formatting: biome (I didn't choose eslint + prettier because biome is more lightweight and easy to setup for our task)
* test: vitest + react testing library
* style: tailwind v4
* state management: zustand (as we didn't have complicated state logics it was a good lightweight choice)
* commit lint: husky+commit-lint this combination guarantee you won't have bad practice codes with unusual commits on your GIT.
* dialogs/accessibility primitives: radix ui
* notifications: sonner

### Why react-query?

for this project server state and ui state were totally different concepts.

react-query helped us to:

* cache server state
* handle loading/error states easily
* invalidate seat map after ticket purchase
* separate async logic from ui components

this made components much cleaner and easier to test.

### Why zustand?

zustand was used only for feature local ui state.

for example:

* selected seat
* zoom level
* seat sizing

this helped us to avoid unnecessary prop drilling while still keeping state management lightweight.

## Seat selection feature

it was the most important feature of our task as we had to render 100k seats in 1 page for this purpose memoizing is not the only method you need you have to think how to render 100k nodes!

so here is the part we have to go for virtualization it only renders nodes which are in viewport, which helps us to render all the items with a really good performance.

so I separated the virtualization logic and the design now we have dumb Seat component, which are not heavy to render and we have memoized vertical virtualization, which works perfectly as I tested for 100k seats!

in our api app we have a generateSeatMap util which helped us to generate different size of maps which loads randomly on our main page.

I used zustand to save the current state of our seat-selection feature, which helped us to implement zoom in/zoom out feature, which is rally cool!

### Responsive behavior

one important challenge was handling large seat maps on smaller devices.

instead of shrinking seats too much and making the ui unusable, horizontal and vertical scrolling were implemented together with zoom controls.

this made mobile experience much better while still supporting really large maps.

### Seat selection flow

the current flow works like this:

```txt
home page -> random map redirect -> seat selection -> purchase confirmation dialog -> ticket success page
```

after successful purchase:

* seat map invalidates automatically
* purchased seat becomes reserved
* user gets redirected to ticket page
* ticket id can be copied easily

## Error handling

different levels of error handling were implemented in the project:

* react-query errors for api requests
* toast notifications for mutations
* react error boundary for runtime errors
* route level error pages for invalid routes and unexpected router failures
* 404 page for unknown routes

this layering helped us to keep the application stable and user friendly.

## Testing

the project uses:

* vitest
* react testing library
* jsdom

testing strategy mainly focuses on:

* user behavior
* important feature flows
* interaction testing
* utility testing

instead of testing implementation details or styling.

## Styling system

tailwindcss v4 was used together with design tokens and reusable ui primitives.

shared components like:

* button
* card
* dialog
* spinner
* error message

were implemented to keep design system consistent across the application.

dark mode support was also added using next-themes.

## Performance considerations

because this task required rendering huge amount of seats, performance was one of the most important parts of implementation.

important optimizations:

* virtualization using react-window
* memoized seat rows
* lightweight seat components
* separated ui state from server state
* avoiding unnecessary re-renders
* keeping seat rendering dumb and predictable

without virtualization rendering 100k dom nodes would heavily impact browser performance and memory usage.

## Next steps

This project is a mvp of what we want the most important part for the final product would be how we want to serve maps data, I think we need to serve data batched for different parts of the stadium and serving 100k data at once is not a really cool idea.

in this case we can show it differently, for example you may want to select which part of stadium works for you, then you only see that parts map.

other future improvements:

* websocket support for live seat reservation updates
* optimistic updates for seat purchase
* e2e testing
* server side rendering/streaming
* real authentication and user sessions
* persisting purchased tickets
* analytics and monitoring
* seat grouping and stadium section support

## env file

to run the project it is better for you to have an env file wit `VITE_API_URL` key inside it to set backend route which will be validated using `zod` and passed to the services package.

example:

```env
VITE_API_URL=http://localhost:3001
```

if env variable does not exist, application falls back to default local api url.
