const { merge } = require('mochawesome-merge')
const request = require('request');
const fs = require('fs');
const path = require('path');
 
const resultsPath = path.join(__dirname, 'cypress', 'results', '*');

const send_report = (message) => {
    request("https://api.telegram.org/bot436435344:AAGajvZeXrHI7deQFf5HsjDwAqlM9QBAOOo/sendMessage?chat_id=305267711&text=" + encodeURI(message));
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

    let error_message = "";
    report.results.forEach(result => {
        result.suites.forEach(suite => {
            suite.tests.forEach(test => {
                if (test.pass != true)
                {
                    
                    if (error_message !== "")
                        error_message += "\n";
                    error_message += "❌ " + result.file.split('integration/')[1];
                } 
            });
        });
    });
    send_report(error_message);
})