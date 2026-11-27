# Phase D day 4

Thursday, November 26, 2026.

The account opens the Stripe customer portal. From there a person can update the card, cancel, or download a receipt. The return is at /billing/portal. The receipt list can be empty, and the error is shown on that page. Desktop uses two columns. Phone uses one column.

A coupon is a Stripe coupon, applied at checkout. It is not a second discount system.

An owner admin can record a refund in Stripe. A content manager and a moderator cannot. The confirmation says the refund was recorded in Stripe.

A comped account takes no Stripe charge. Listings stay visible. The account is labeled comped rather than cash.

Stripe webhooks update the stored status. Live mode events are refused. Test mode is the only mode that is accepted.
