# Phase D day 1

Monday, November 23, 2026.

The review host is still https://18.118.84.127. Home is that address. Admin is https://18.118.84.127/admin. The test accounts keep the password Review-day9-shell.

Stripe runs in test mode. The secret key, the publishable key, and the webhook secret stay on the host. This repository does not store them. Reatics stores subscription status and does not store a card number.

The paid plans are Broker and Owner with listings, each $129 a month. Space seeker and coworking provider stay free. Checkout is Stripe Checkout. The return page shows success or failure and does not start a second charge.

The inactive products are featured listing, search ad, email campaign, credit-check fee, and e-signature fee. They have no public purchase flow.

The plan choice is at /plans. The return is at /billing/return. Signed-out, signed-in, error, and success are on those screens, for desktop and phone.

This revision is local until the host build. The AWS site remains the Phase C review host.
