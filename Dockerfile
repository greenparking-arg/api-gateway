# Etapa de construcción
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción
FROM node:20-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Exponer el puerto
EXPOSE 5500

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]