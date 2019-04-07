SERVER_ADDRESS=root@svg.cncf.io
nocheck=" -o StrictHostKeyChecking=no "
ssh $nocheck $SERVER_ADDRESS << 'EOSSH'
touch /.cloud-warnings.skip
which git || (
  apt-get update
  apt-get -y install git
)
git config --global user.email "info@cncf.io"
git config --global user.name "CNCF-Bot"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
apt-get update
apt-get -y install build-essential gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
echo '
  0 */12 * * * root /usr/local/bin/certbot renew >/dev/null 2>&1
' > /etc/cron.d/renewer
EOSSH

