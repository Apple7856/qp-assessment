FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV SERVER_PORT=8008
ENV DB_PORT=5432
ENV DB_HOST=localhost
ENV JWT_SECRET=sfhdjhfjdfhkdfkd

EXPOSE 8008

CMD ["npm", "run", "start:dev"]