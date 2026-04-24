FROM node:20-alpine

WORKDIR /app

COPY package.json package.json
RUN npm install --no-fund --no-audit

COPY src ./src

EXPOSE 8090

CMD ["npm", "start"]

