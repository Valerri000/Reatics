# Phase C day 6

Monday, November 16. The homepage search opens /map with the place, the sale, lease, or coworking choice, and the type. It no longer stops at /featured. The search does not call Mapbox from the homepage. The map page reads those fields.

Featured listings show listings set to Index. An unavailable listing stays off Featured. When none are set to Index, Featured says "No listings yet." Design samples are not listing records and are not indexed.

/sitemap.xml includes a published, indexable listing whose sitemap box is checked. It leaves out an unavailable listing and the /map route.

A changed listing slug still answers with a 301 on the public site.

Desktop, tablet, and phone keep the same search handoff. This revision is in the local repository. The AWS host serves it after that build.
