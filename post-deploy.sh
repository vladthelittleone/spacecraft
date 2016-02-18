#!/bin/sh
# This is sample deploy script
# You can run this on server after git push or
# locally before you put new version of website via FTP

echo "[Deploy] Running npm install"
npm install
if [ $? = "0" ]; then
  echo "[Deploy] Npm install success, running Bower install"
  cd public
  bower install --allow-root
  if [ $? = "0" ]; then
  	cd ..
    echo "[Deploy] Bower install success, running build"
    rm -rf build
    gulp build
    if [ $? = "0" ]; then
      echo "[Deploy] Build success, deploying files"
	  NODE_ENV=production NODE_PATH=. PORT=8080 DEBUG=spacecraft node bin/www
    else
      echo "[Deploy] Build failed, aborting deploy"
    fi
  else
    echo "[Deploy] Bower install failed, aborting deploy"
  fi
else
  echo "[Deploy] Npm install failed, aborting deploy"
fi
