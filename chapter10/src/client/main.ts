import { render } from '../../node_modules/lit-html/lit-html.js';
import { Application } from './ui/application.js';


let renderingIsInProgress = false;
let application = new Application(async () => {
  // When two subsequent rendering calls arrive, only the first one passes the if statement.
  // However changes made between the two subsequent calls will be picked up by the lit-html
  // `render()` call invoked after `await 0` statement and the UI will reflect the most resent state.
  if (!renderingIsInProgress) {
    renderingIsInProgress = true;
    await 0;
    renderingIsInProgress = false;
    render(application.render(), document.body);
  }
});
