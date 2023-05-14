FROM node:18-alpine
#FROM urielch/opencv-nodejs

WORKDIR /app

COPY package*.json ./

#RUN npm remove @u4/opencv4nodejs

RUN npm install

#RUN npm link @u4/opencv4nodejs

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
