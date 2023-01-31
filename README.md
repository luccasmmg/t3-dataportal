# T3-DataPortal

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Roadmap

- [ ] Add a Stripe integration
- [ ] Add a way for once a user has payed and authenticated, he can create a Data Portal
- [ ] CRUD For Organizations
- [ ] OpenAPI For Organizations

## What will we need

- [ ] A Vercel deployment
- [ ] A Database on Planetscale
- [ ] A Typesense instance, where every Data portal will have collections for
  - packages
  - resources
  - organization
  - themes
  - showcases
  - maybe content

## Flow of creating an account

- User pays
- Login
- The system see that he is not assigned as a sysadmin for any data-portal and then redirects to the Portal creation page
- Once the user is a sysadmin he can add members to the portal and then these members to organizations

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
