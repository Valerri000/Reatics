# Phase C day 10 walkthrough

Friday, November 20.

Walk the listing page and the map on https://18.118.84.127.

Desktop, Tablet, and Phone.

1. /map is a split view. Hide Results leaves the map. Zoom, Satellite, clustering, Draw area, and hover stay.
2. A filter change does not reload the map. An empty search says "No listings yet."
3. /listings/201-n-brand shows the listing. The heading is 28px on a phone and 40px on desktop. Facts stack on a phone.
4. A coworking listing shows 1-888-518-9168 and does not show the provider contact.
5. /map?city=Glendale and /map?type=Office can be shared. /map is noindex. /glendale remains the page asked of Google.
6. Homepage search opens /map. Pan and zoom do not make a new geocoding call.

The Mapbox charge note is docs/phase-c-day-7-mapbox.md.
