FROM node:latest

RUN npm install -g typescript
RUN npm install -g ts-node

ARG PORT=3500
ARG MONGO_URI=mongodb+srv://bansallalit460:PF86riFOOm28lql4@cluster0.n8czefp.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0
ENV PORT=${PORT} \
    MONGO_URI=${MONGO_URI}

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE $PORT

CMD [ "npm","run","start:prod" ]