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


WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/server.js"]





