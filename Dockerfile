FROM node:lts-jessie

# install simple http server for serving static content
RUN npm install -g truffle
# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

RUN truffle compile
# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

ENV HOST 0.0.0.0
# EXPOSE 8080
# CMD [ "http-server", "dist", "--push-state", "-a 0.0.0.0", "-p 8080" ]
