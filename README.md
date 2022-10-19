# Micro-Frontends-App
A frontened project powered by the micro-frontends architecture pattern using ReactJS, VueJS , Webpack, ModuleFederationPlugin, github actions, AWS S3, AWS cloudFront, AWS IAM.

## Infrastructure

The project divided into 4 micro-frontends each of them can be built, and deployed independently.

![Infrastructure plan](https://github.com/ridhamz/Micro-Frontends-App/blob/main/packages/mfe.png)

### CI/CD using github actions

Each micro-frontend has a deploy config file: example of deply-container.yml

```yml
name: deploy-container

on:
  push:
    branches:
      - main
    paths:
      - 'packages/container/**'

defaults:
  run:
    working-directory: packages/container

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run build
        env:
          PRODUCTION_DOMAIN: ${{secrets.PRODUCTION_DOMAIN}}

      - uses: chrislennon/action-aws-cli@1.1
      - run: aws s3 sync dist s3://${{ secrets.AWS_S3_BUCKET_NAME }}/container/latest
        env:
          AWS_ACCESS_KEY_ID: ${{secrets.AWS_ACCESS_KEY_ID}}
          AWS_SECRET_ACCESS_KEY: ${{secrets.AWS_SECRET_ACCESS_KEY}}
          AWS_EC2_METADATA_DISABLED: true

      - run: aws cloudfront create-invalidation --distribution-id ${{secrets.AWS_DISTRIBUTION_ID}} --paths "/container/latest/index.html"
        env:
          AWS_ACCESS_KEY_ID: ${{secrets.AWS_ACCESS_KEY_ID}}
          AWS_SECRET_ACCESS_KEY: ${{secrets.AWS_SECRET_ACCESS_KEY}}
          AWS_EC2_METADATA_DISABLED: true

```



