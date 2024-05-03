import { CronJob } from 'cron';
import axios from 'axios'

// Create a new cron job to run every 14 minutes to keep our live website active on render
// the service usually goes to sleep every 15 minutes if no requests
export const cronJob = new CronJob('*/14 * * * *', async () => {

    try {
        // Make an API request to refresh the page
        await axios.get('https://backend-final-3.onrender.com/')
    } catch (error:any) {

        // tslint:disable-next-line:no-console
        console.error(`Fetched Error`);
    }
}, null, true, 'UTC');