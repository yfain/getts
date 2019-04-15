import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockchainNodeService } from '../shared/services';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html'
})
export class TransactionFormComponent {
  readonly transactionForm: FormGroup;

  constructor(readonly node: BlockchainNodeService, fb: FormBuilder) {
    this.transactionForm = fb.group({
      sender   : [, Validators.required],
      recipient: [, Validators.required],
      amount   : [, Validators.required]
    });
  }

  enqueueTransaction() {
    if (this.transactionForm.valid) {
      this.node.addTransaction(this.transactionForm.value);
      this.transactionForm.reset();
    }
  }
}
