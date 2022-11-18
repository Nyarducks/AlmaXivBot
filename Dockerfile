# Use NodeJS v16.9.0
FROM node:16.9.0

# clone source codes on to /usr/AlmaXivBot
# update container machine
# minimum install vim editor
# remove apt cached data(reduce image size)
RUN git clone https://github.com/Nyarducks/AlmaXivBot.git -b develop /usr/AlmaXivBot \
 && apt-get update \
 && apt-get install -y --no-install-recommends \
    vim \
 && apt-get -y clean \
 && rm -rf /var/lib/apt/lists/*

# Change directory to /usr/AlmaXivBot
WORKDIR /usr/AlmaXivBot

# install node modules from project package.json
RUN yarn install