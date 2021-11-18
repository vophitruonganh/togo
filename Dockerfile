FROM node:14.8.0-alpine3.10

ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

WORKDIR app
RUN chmod +x /app
COPY package*.json /app/

RUN npm install --production

COPY . /app/

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
