import React from 'react';

type PendingTransactionsPanelProps = {
  formattedTransactions: string;
  onGenerateBlock: () => void;
  disabled: boolean;
}

const PendingTransactionsPanel: React.FC<PendingTransactionsPanelProps> = ({ formattedTransactions, onGenerateBlock, disabled }) => {
  return (
    <>
      <h2>Pending transactions</h2>
      <pre className="pending-transactions__list">
        {formattedTransactions || 'No pending transactions yet.'}
      </pre>
      <div className="pending-transactions__form">
        <button disabled={disabled}
                onClick={() => onGenerateBlock()}
                className="ripple"
                type="button">GENERATE BLOCK</button>
      </div>
      <div className="clear"></div>
    </>
  );
}

export default PendingTransactionsPanel;
