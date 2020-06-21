const name = 'nemo';

function findPerson (allNames) {
    const t0 = performance.now();
    for (const person of allNames) {
        if (person === name) {
            console.log('Hi Found NEMO!');
        }
    }
    const t1 = performance.now();
    console.log('Time taken to find Nemo: ', (t1-t0), 'milliseconds');
    
}

const large = new Array(1).fill("nemo");
findPerson(large);