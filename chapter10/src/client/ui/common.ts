import { html, TemplateResult } from '../../../node_modules/lit-html/lit-html.js';
import { Transaction } from '../lib/blockchain-node.js';

export type Callback = () => void;

export interface Renderable<T> {
  requestRendering: Callback;
  render(data: T): TemplateResult;
}

export function titleize(text: string): string {
  return text.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
}

export function formatTransactions(transactions: Transaction[]): string {
  return transactions.map(t =>`${t.sender} → ${t.recipient}: $${t.amount}`).join('\n');
}

export function randomDelay(maxMilliseconds: number = 100): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), Math.floor(Math.random() * Math.floor(maxMilliseconds)));
  });
}

export namespace UI {
  export function button(label: string, disabled: boolean = false): TemplateResult {
    return html`
      <button type="submit" ?disabled=${disabled} class="ripple">${label}</button>
    `;
  }

  export function formField(name: string, value: any, changeHandler: EventListener,
                            disabled: boolean = false, type: 'text' | 'number' = 'text'): TemplateResult {
    return html`
      <input name=${name}
             type=${type}
             .value=${value}
             @change=${changeHandler}
             ?disabled=${disabled}
             placeholder=${titleize(name)}
             autocomplete="off">
    `;
  }
}
