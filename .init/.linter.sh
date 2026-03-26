#!/bin/bash
cd /tmp/kavia/workspace/code-generation/react-music-player-244228-244242/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

