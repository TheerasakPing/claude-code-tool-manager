const fetch = require('node-fetch'); // wait, fetch is global in Node 18+
const checkStatus = async () => {
    while (true) {
        try {
            const res = await fetch('https://api.github.com/repos/TheerasakPing/claude-code-tool-manager/actions/runs?per_page=5', {
                headers: { 'Accept': 'application/vnd.github.v3+json', 'Cache-Control': 'no-cache' }
            });
            const data = await res.json();
            const releaseRun = data.workflow_runs.find(r => r.name === 'Release' && r.head_branch === 'v3.2.4');
            if (releaseRun) {
                console.log(`[${new Date().toISOString()}] Status: ${releaseRun.status}, Conclusion: ${releaseRun.conclusion}`);
                if (releaseRun.status === 'completed') {
                    console.log(`FINAL RESULT: ${releaseRun.conclusion}`);
                    break;
                }
            } else {
                console.log(`[${new Date().toISOString()}] Release run not found yet...`);
            }
        } catch (e) {
            console.error(e.message);
        }
        await new Promise(r => setTimeout(r, 60000)); // wait 60s
    }
};
checkStatus();
