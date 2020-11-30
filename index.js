const { merge } = require('mochawesome-merge')
const request = require('request');
const fs = require('fs');
 
// const environmentDir = './cypress/results';

// fs.readdir(environmentDir, (err, files) => {

//     files.forEach(file => {
// 		request('https://api.telegram.org/bot436435344:AAGajvZeXrHI7deQFf5HsjDwAqlM9QBAOOo/sendMessage?chat_id=305267711&text=sdf');
//     });
// });

let send_report = (message) => {
    request("https://api.telegram.org/bot436435344:AAGajvZeXrHI7deQFf5HsjDwAqlM9QBAOOo/sendMessage?chat_id=305267711&text=" + encodeURI(message));
};

const options = {
  files: [
    './cypress/results/*.json',
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
                    error_message += ("❌ " + result.file + test.err.message);
                } 
            });
        });
    });
    send_report(error_message);
})