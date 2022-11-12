# A tecnologia base de criação da imagem
FROM node

# Diretório da imagem
WORKDIR /app

# Comando para copiar os arquivos para a pasta /app da imagem
COPY . /app

# Comando para instalar dependências
RUN npm install

# Comando para executar o código quando o container for criado
CMD ["node", "/app/services/shipping/index.js"]