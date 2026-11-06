# November 6 walkthrough

Open https://18.118.84.127. The certificate warning is expected. Sign in as staging-content@example.com when a draft or the admin is part of the step. The password is Review-day9-shell.

## Homepage

Open `/`. The search field submits to `/featured`. It does not open the map. Featured listings use the card layout. Until a listing is set to Index, the row shows the design samples. The header logo is /logo.png. The blog block says "No posts yet." when no post is published.

## About

Open `/about`. The heading and the body come from the About page. The office address is 201 N Brand Suite 200, Glendale CA, 91203. The phone is 1-888-518-9168.

## Blog

Open `/blog`. The page is the insights index. A published post is `/blog/{slug}`. The draft `office-tour-notes` opens at `/blog/office-tour-notes?preview=1` after the content manager signs in, and the page says "Draft preview".

## Glossary

Open `/glossary`. The index lists published terms, or says "No terms yet." A published term is `/glossary/{slug}`. The sample term is `/glossary/cap-rate` when that record is published.

## Glendale

Open `/glendale` when the city is published. The heading is the city title, and the page links to the map search for that city. Change the slug in Cities. The old address redirects with a 301. The sitemap box adds and removes `/glendale`.

## Office

Open `/office` when the property type is published. It uses the same place page as a city. Another property type is a new record, not a new template.

## Leave unbuilt

Map search and Mapbox stay off. Stripe stays off. Terms and Privacy stay unpublished until the copy is supplied.
