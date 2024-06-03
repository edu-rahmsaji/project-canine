FROM node:latest
WORKDIR /web
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev:expose"]
