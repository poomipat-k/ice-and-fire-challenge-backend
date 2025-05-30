FROM node:24-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 8080
CMD ["node", "main.js"]