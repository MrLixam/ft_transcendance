ARG NGINX_IMAGE_VERSION=1.27.0

####################################
### Create a base w/ ModSecurity ###
####################################

FROM nginx:${NGINX_IMAGE_VERSION}-alpine

ENV NGINX_IMG_VERSION=1.27.0
ENV MODSEC_VERSION=3.0.12
ENV MODSEC_CONNECTOR_VERSION=1.0.3
ENV OWASP_CRS_VERSION=4.4.0

# Install tools and dependencies
RUN apk update && apk add --no-cache \
		wget \
		tar \
		gzip \
		gcc \
		g++ \
		linux-headers \
		libc-dev \
		make \
		autoconf \
		automake \
		pcre-dev \
		zlib-dev \
		openssl \
		openssl-dev \
		curl \
		ca-certificates

##> Download ModSecurity <##

RUN wget -O /tmp/modsecurity.tar.gz \
	https://github.com/owasp-modsecurity/ModSecurity/releases/download/v$MODSEC_VERSION/modsecurity-v$MODSEC_VERSION.tar.gz
RUN mkdir -p /tmp/modsec
RUN tar -xvzf /tmp/modsecurity.tar.gz -C /tmp/modsec

# Build ModSecurity
WORKDIR /tmp/modsec/modsecurity-v${MODSEC_VERSION}
RUN ./build.sh
RUN ./configure
RUN make -j$(nproc)
RUN make install

##> Download ModSecurity-nginx connector <##

RUN wget -O /tmp/modsecurity-connector.tar.gz \
	https://github.com/owasp-modsecurity/ModSecurity-nginx/releases/download/v${MODSEC_CONNECTOR_VERSION}/modsecurity-nginx-v${MODSEC_CONNECTOR_VERSION}.tar.gz
RUN mkdir -p /tmp/modsec-connector
RUN tar -xvzf /tmp/modsecurity-connector.tar.gz -C /tmp/modsec-connector

# Download nginx... again
RUN wget -O /tmp/nginx.tar.gz \
	http://nginx.org/download/nginx-$NGINX_IMG_VERSION.tar.gz
WORKDIR /tmp
RUN tar -xvzmf nginx.tar.gz
WORKDIR /tmp/nginx-${NGINX_IMG_VERSION}

# Catch the current docker nginx' configure options
RUN nginx -V 2>&1 | grep "configure arguments" > /tmp/nginx-configure-args.txt

# Build the nginx with the ModSecurity module
RUN sh -c "./configure --add-dynamic-module=../modsec-connector/modsecurity-nginx-v${MODSEC_CONNECTOR_VERSION} \
	$(cat /tmp/nginx-configure-args.txt | cut -d' ' -f3-)"
RUN make modules

# Copy the module to the nginx modules directory
RUN mkdir -p /etc/nginx/modules
RUN cp objs/ngx_http_modsecurity_module.so /etc/nginx/modules

##> Setup the OWASP ModSecurity Core Rule Set (CRS) <##

# Download and unpack
RUN rm -rf /usr/share/modsecurity-crs
RUN wget -O /tmp/owasp-crs.tar.gz \
	https://github.com/coreruleset/coreruleset/archive/refs/tags/v${OWASP_CRS_VERSION}.tar.gz
RUN tar -xvzf /tmp/owasp-crs.tar.gz -C /usr/local
RUN mv /usr/local/coreruleset-${OWASP_CRS_VERSION} /usr/local/modsecurity-crs

# Setup default crules
RUN mv /usr/local/modsecurity-crs/crs-setup.conf.example /usr/local/modsecurity-crs/crs-setup.conf
RUN mv /usr/local/modsecurity-crs/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf.example \
	/usr/local/modsecurity-crs/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf

##> Setup ModSecurity in nginx <##

RUN mkdir -p /etc/nginx/modsec
RUN cp /tmp/modsec/modsecurity-v${MODSEC_VERSION}/unicode.mapping /etc/nginx/modsec
COPY ./modsec.conf /etc/nginx/modsec/modsecurity.conf
COPY ./modsec-main.conf /etc/nginx/modsec/main.conf

# Copy the default configuration

#######################
### Setup SSL certs ###
#######################

# Create a self-signed certificate
ENV NGINX_CERTS_DIR=/etc/nginx/certs
RUN mkdir -p $NGINX_CERTS_DIR

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
		-keyout ${NGINX_CERTS_DIR}/ssl.key \
		-out ${NGINX_CERTS_DIR}/ssl.crt \
		-subj "/C=FR/ST=Nouvelle Aquitaine/L=Angoulême/O=42 Angoulême/CN=ft_trans.xtrm.me"

# Files exposed via overwriting /etc/nginx in the docker-compose volumes section
