const { merge } = require('mochawesome-merge')
const request = require('request');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config({ path: path.join(__dirname, ".env") });
const environments = process.env.ENVIRONMENT.split(';');

const send_report = (environment, message) => {
    let telegramBotUrl = process.env.TELEGRAM_BOT_URL;
    let telegramChats = process.env.TELEGRAM_CHATS.split(';');

    message = environment + "\n" + message;
    telegramChats.forEach(chat => {
        request(`${telegramBotUrl}/sendMessage?chat_id=${chat}&text=${encodeURI(message)}`);
    });
};

environments.forEach(environment => {
    const resultsPath = path.join('../', 'parser', 'cypress', 'results', environment, '*');
    const options = {
        files: [
          resultsPath,
        ],
      }
    merge(options).then(report => {
        if (report.stats.failures == 0)
        {
            send_report(environment, "✅ All tests passed");    
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
        send_report(environment, errorMessage);
    })
});

