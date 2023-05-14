FROM node:18-alpine
#FROM urielch/opencv-nodejs

WORKDIR /app

RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

COPY package*.json ./

#RUN npm remove @u4/opencv4nodejs

RUN npm install

#RUN npm link @u4/opencv4nodejs

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
