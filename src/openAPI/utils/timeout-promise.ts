/* file from cli-edgeworkers repo*/
export const promiseTimeout = function (ms: number, promise: Promise<any>) {
  let timeoutHandle: any;
   // Create a promise that rejects in <ms> milliseconds
  const timeoutPromise = new Promise<never>((resolve, reject) => {
    let timeoutObj = { "status": 504 };
    timeoutHandle = setTimeout(() => reject(JSON.stringify(timeoutObj)),ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([ 
    promise, 
    timeoutPromise, 
  ]).then((result) => {
    clearTimeout(timeoutHandle);
    return result;
  });
}