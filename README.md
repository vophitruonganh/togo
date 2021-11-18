# Manabie Test Interview

Project support user login and add tasks everyday

## Getting Started

We can use MacOS or Linux for developer mode

### Prerequisites
```
Make sure you installed tools: 
 + NodeJS version v14.17.x or above
 + Npm version 6.14.xx or above
 + Docker

# For develop enviroment
docker pull postgres
docker pull redis

docker run -p5432:5432 --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
docker run -d -p6379:6379 --name=redis redis

# For staging or production: you build run with docker
```

### Installing
A step by step series of examples that tell you how to get a development env running

Install packages with npm

```
npm install
```

Setup variable environment: you can copy .env.example to .env and change config make to your environment

Run project
```shell
# With env develop
npm run start:dev

# With env staging
npm run start:stag

# With env production
npm run start:prod
```

### Deployment
Before building docker to deploy, need to copy .env for staging/prod to overwrite to .env develop

```shell
docker build -t todo:<version> .

docker run -d -p 8080:8080 todo:<version> --name=todo
```