docker run -it -v $PWD:/e2e -w /e2e -e CYPRESS_VIDEO cypress/included:5.6.0
#TOKEN=1059823581:AAFUlSWEuEubEP-2nCG6QMhR9qNopLpzQcM
#CHAT_ID=334576789
#MESSAGE="Problems in tests"
#URL="https://api.telegram.org/bot1059823581:AAFUlSWEuEubEP-2nCG6QMhR9qNopLpzQcM/sendMessage"
#if [$result!]
#fi curl -s -X POST $URL -d chat_id=$CHAT_ID -d text="$MESSAGE"
