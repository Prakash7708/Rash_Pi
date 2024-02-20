FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME /app/files


# ENV DB3=mongodb://localhost:27024/


EXPOSE 5000

CMD ["npm", "start"]


