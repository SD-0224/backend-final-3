import { CronJob } from 'cron';

// Create a new cron job to run every 14 minutes to keep our live website active on render
// the service usually goes to sleep every 15 minutes if no requests
export const cronJob = new CronJob('*/14 * * * *', async () => {

    try {
        // Make an API request to refresh the page
        const response = await fetch('https://backend-final-3.onrender.com/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });

    } catch (error:any) {
        return error;
    }
}, null, true, 'UTC');