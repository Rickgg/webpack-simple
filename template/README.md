# {{ name }}

> {{ description }}

{{#firebaseHosting}}
## !!!IMPORTANT!!!

Before deploying with Gitlab CI to Firebase Hosting, do these steps:

```bash
# Initialize Firebase Hosting
firebase init

# Choose Hosting
? Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confirm your choices. Hosting: Configure and deploy Firebase Hosting sites

# Choose default Firebase Project
? Select a default Firebase project for this directory:

# Set public directory "dist"
? What do you want to use as your public directory? (public): dist

# Set as single-page-app
? Configure as a single-page app (rewrite all urls to /index.html)? (y/N): y

# After finishing setup, run
firebase login:ci

# After accepting usage of account, copy token
✔  Success! Use this token to login on a CI server:

XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Enter into CI/CD settings in gitlab.com project page, and set new environment variable
Name: firebaseCI
Value: firebaseToken
```
{{/firebaseHosting}}

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
