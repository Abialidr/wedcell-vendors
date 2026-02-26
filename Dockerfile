FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm i --force
COPY . .
RUN npm run build
CMD ["npm", "start"]
