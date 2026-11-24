# Plan choice lock

Monday, November 23, 2026.

The plan choice is locked for build.

Plans:

- Broker, $129/month, Stripe Checkout
- Owner with listings, $129/month, Stripe Checkout
- Space seeker, free, no checkout
- Coworking provider, free, no checkout

States:

- Signed out. The prices are visible. The action is Sign in. Checkout does not start.
- Signed in. A paid plan continues to Stripe Checkout. A free plan says no payment is required.
- Error. Checkout did not start. No charge was made.
- Success. The return page says the payment was recorded and no second charge was made.
- Failure. The return page says the payment was not completed and no second charge was made.

The return page has no checkout button.

Desktop uses two columns. Phone uses one column.

Inactive products stay off this screen: featured listing, search ad, email campaign, credit-check fee, and e-signature fee.
