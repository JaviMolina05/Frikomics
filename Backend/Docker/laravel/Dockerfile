FROM php:8.2-fpm

# Instala extensiones necesarias, incluyendo pdo_mysql
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    nginx \
    git \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
# Configuracion Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www

CMD service nginx start && php-fpm
