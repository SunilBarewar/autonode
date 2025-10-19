Why should we use background jobs?

so let's say user is performing some actions and actions involves multiple steps to get done

long-running task

user clicks the generate summary => send the request  => backend generates the summary in 45 seconds => user waits => risks => request timeout, tab closed, connection lost => user might never get result



generate summary ==> send the network request => with use the bg jobs and queue the request => instantly send response to user with relevant message => will process it in bg => once done will notify the user