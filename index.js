const { merge } = require('mochawesome-merge')
const request = require('request');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const resultsPath = path.join(__dirname, 'cypress', 'results', '*');

dotenv.config();

const send_report = (message) => {
    let environment = process.env.ENVIRONMENT; 
    let telegramBotUrl = process.env.TELEGRAM_BOT_URL;
    let telegramChats = process.env.TELEGRAM_CHATS.split(';');

    message = environment + "\n" + message;
    telegramChats.forEach(chat => {
        request(`${telegramBotUrl}/sendMessage?chat_id=${chat}&text=${encodeURI(message)}`);
    });
};

const options = {
  files: [
    resultsPath,
  ],
}

merge(options).then(report => {
    if (report.failures == 0)
    {
        send_report("✅ All tests passed");    
        return ;
    }

    let errorMessage = "";
    report.results.forEach(result => {
        result.suites.forEach(suite => {
            suite.tests.forEach(test => {
                if (test.pass != true)
                {
                    
                    if (errorMessage !== "")
                        errorMessage += "\n";
                    errorMessage += "❌ " + result.file.split('integration/')[1];
                } 
            });
        });
    });
    send_report(errorMessage);
})