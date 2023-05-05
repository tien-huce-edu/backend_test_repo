FROM node:19.0.0-alpine

WORKDIR /home/node/backend

# RUN yarn global add pm2

COPY . .

# RUN yarn build

EXPOSE 3000

# CMD ["yarn", "start:dev"]