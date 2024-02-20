FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME /app/files


# ENV DB3=mongodb://localhost:27024/


EXPOSE 5000

CMD ["npm", "start"]



# docker build -t my-mern-app .

# docker run -p 5000:5000 my-mern-app

# docker inspect mongo-db | findstr "IPAddress"

# docker pull mongo

# docker run -d -p 27017:27017 --name mongo-db mongo --auth

# sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id

# http://157.245.105.79/ new 134.209.147.49

# docker run -d --name mongo-online -p 27017:27017 -v /my/own/datadir:/data/db mongo --auth

# docker run -d --name mongo-online -p 27017:27017 -v mongo --auth

# docker exec -it mongo-db mongosh admin

# db.createUser({user: "kalvimongo", pwd: "vPn123!a12", roles: [{role: "root", db: "admin"}]})

# exit

# docker restart my-mongodb