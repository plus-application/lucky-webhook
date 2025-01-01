# 使用官方 Node.js 镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 设置 npm 镜像源为淘宝镜像
RUN npm config set registry https://registry.npm.taobao.org

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目代码
COPY . .

# 暴露容器的服务端口
EXPOSE 6000

# 启动应用程序
CMD ["npm", "run", "start"]
