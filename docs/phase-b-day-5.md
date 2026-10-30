# Phase B day 5

Friday, October 30, 2026.

The city page and the property-type page use one template. Each page shows the title, the intro, a short set of listing cards, and a link labeled "View on the map." That link is reserved for the filtered map. It does not open a live map. The listing page is not in this phase.

A city or property type with no matching listings shows "No listings yet." The card is the Phase A listing card. A page shows at most six cards.

Glendale is a published city record at /glendale. It is no longer a generic page. Office is a published property-type record at /office, on the same template. A draft city or property type stays off the public address.

Changing a city slug stores the old address as a 301 at the root path. Changing a property-type slug does the same. The redirect is saved. It is not served on the public site yet.

Glendale and Office are seeded when the server starts, if they are not already there. If a generic page still uses the Glendale slug, that page is removed so the city can keep /glendale. These pages show on https://18.118.84.127 after this revision is built on that host.

- https://18.118.84.127/glendale
- https://18.118.84.127/office

About, the blog, and the city template were checked at midday. The frames for the city page and the property-type page are ready for the Monday review.
