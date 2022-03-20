import { Component, Input } from '@angular/core';
import { Block, formatTransactions } from '../shared/services';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html'
})
export class BlockComponent {
  // @ts-ignore
  @Input() index: number;
  // @ts-ignore
  @Input() block: Block;

  get formattedTransactions(): string {
    return formatTransactions(this.block.transactions);
  }
}
