FROM node:12-alpine
LABEL autor="Salvado Briones y Victoria"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
CMD ["node", "index.js"]