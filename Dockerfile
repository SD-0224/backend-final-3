#Define what is your base image
FROM node:16-alpine as development

#Set the working directory on the container
WORKDIR /usr/src/app

#Copy the package json files, * is a wildcard ,. is /usr/src/app
COPY package*.json .

#run npm install
RUN npm install

# now copy all other files, the first . all files to . means workdir
COPY . .

#Building the source code
RUN npm run build

#Define second image
FROM node:16-alpine as production

#Define environment variables
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV DB_HOST=bumpso1olabrdxegfmme-mysql.services.clever-cloud.com
ENV DB_USER=uo4knvxo5mpdoi1g
ENV DB_PASSWORD=s9cF103Gguk3aGMobBnX
ENV DB_NAME=bumpso1olabrdxegfmme
ENV DB_PORT=3306
ENV DB_URI=mysql://uo4knvxo5mpdoi1g:s9cF103Gguk3aGMobBnX@bumpso1olabrdxegfmme-mysql.services.clever-cloud.com:3306/bumpso1olabrdxegfmme
ENV SERVER_PORT=3000

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/server.js"]





