#!/bin/sh
# This is sample deploy script
# You can run this on server after git push or
# locally before you put new version of website via FTP
if [ $1 = "preinstall" ]; then
	echo "[Preinstall] Running preinstall script"
	npm run preinstall
fi
if [ $1 = "build" ]; then
	echo "[Build] Running npm install"
	npm install
	if [ $? = "0" ]; then
	  echo "[Build] Npm install success, running Bower install"
	  cd public
	  bower install --allow-root
	  if [ $? = "0" ]; then
		cd ..
		echo "[Build] Bower install success, running gulp build"
		rm -rf build
		gulp browserify
		gulp build
		gulp rev
		if [ $? = "0" ]; then
		  echo "[Build] Gulp build success"
		else
		  echo "[Build] Gulp build failed, aborting build"
		fi
	  else
		echo "[Build] Bower install failed, aborting build"
	  fi
	else
	  echo "[Build] Npm install failed, aborting build"
	fi
fi
if [ $1 = "start" ]; then
	echo "[Start] Running server"
	pm2 start ./config/pm2.json
fi
if [ $1 = "start-production" ]; then
	echo "[Start] Running server"
	pm2 start ./config/pm2.json --env production
fi
if [ $1 = "stop" ]; then
	echo "[Stop] Stop server"
 	pm2 stop ./config/pm2.json
fi
if [ $1 = "log" ]; then
	pm2 logs
fi
if [ $1 = "tools" ]; then
	npm install forever -g
	npm install -g bower
	npm install --g gulp-cli
fi

exit 0
