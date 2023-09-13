FROM node:18

EXPOSE 3000

WORKDIR /app

RUN npm install npm@latest -g

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]