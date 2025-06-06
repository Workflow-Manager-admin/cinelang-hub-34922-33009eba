#!/bin/bash
cd /home/kavia/workspace/code-generation/cinelang-hub-34922-33009eba/cine_lang_hub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

