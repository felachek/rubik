//Slowing down execution

// const COMMAND_DELAY = 2000;


// for (const command of ['visit', 'click', 'trigger', 'type', 'clear', 'reload', 'contains']) {
//     Cypress.Commands.overwrite(command, (originalFn, ...args) => {
//         const origVal = originalFn(...args);

//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 resolve(origVal);
//             }, COMMAND_DELAY);
//         });
//     });
// } 