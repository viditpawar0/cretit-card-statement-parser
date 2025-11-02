import './App.css';
import { useState } from 'react';
import StatementDetails from './components/StatementDetails';
import PdfCoordinates from './utils/PdfCoordinates';
import PdfParser from './utils/PdfParser';
import { WorkerMessageHandler } from "pdfjs-dist/build/pdf.worker.min.mjs";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  WorkerMessageHandler,
  import.meta.url
).toString();

function App() {
  const banknames = ['Kotak', 'ICICI', 'HDFC', 'AXIS', 'SCB'];
  const [bankName, setBankName] = useState(banknames[0]);
  const [statementPDF, setStatementPDF] = useState(null);
  const [statementDetails, setStatementDetails] = useState(null);
  const [pdfPassword, setPdfPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetStatementDetails = async () => {
    if (!statementPDF) {
      alert('Please upload a statement first!');
      return;
    }

    setLoading(true);

    try {
      const pdfParser = await PdfParser.newParser(statementPDF, pdfPassword);
      const data = {};
      if (bankName === 'Kotak') {
        data.accountSummary = {
          "Previous Balance": pdfParser.getTextByCoordinates(...PdfCoordinates.KOTAK.PREVIOUS_BALANCE),
          "Credits": pdfParser.getTextByCoordinates(...PdfCoordinates.KOTAK.CREDITS),
          "Debits": pdfParser.getTextByCoordinates(...PdfCoordinates.KOTAK.DEBITS),
          "Total Due": pdfParser.getTextByCoordinates(...PdfCoordinates.KOTAK.TOTAL_DUE)
        }
        data.totalCreditLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.KOTAK.TOTAL_CREDIT_LIMIT);
        data.availableCreditLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.KOTAK.AVAILABLE_CREDIT_LIMIT);
        data.availableCashLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.KOTAK.AVAILABLE_CASH_LIMIT);
        data.dueDate = pdfParser.getTextByCoordinates(...PdfCoordinates.KOTAK.DUE_DATE);
      } else if (bankName === 'SCB') {
        data.accountSummary = {
          "Previous Balance": pdfParser.getTextByCoordinates(...PdfCoordinates.SCB.PREVIOUS_BALANCE),
          "Payments": pdfParser.getTextByCoordinates(...PdfCoordinates.SCB.PAYMENTS),
          "Credits": pdfParser.getTextByCoordinates(...PdfCoordinates.SCB.CREDITS),
          "Debits": pdfParser.getTextByCoordinates(...PdfCoordinates.SCB.PURCHASES),
          "Cash Advance": pdfParser.getTextByCoordinates(...PdfCoordinates.SCB.CASH_ADVANCE),
          "Total Due": pdfParser.getTextByCoordinates(...PdfCoordinates.SCB.TOTAL_DUE)
        };
        data.totalCreditLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.SCB.TOTAL_CREDIT_LIMIT);
        data.availableCreditLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.SCB.AVAILABLE_CREDIT_LIMIT);
        data.availableCashLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.SCB.AVAILABLE_CASH_LIMIT);
        data.dueDate = pdfParser.getTextByCoordinates(...PdfCoordinates.SCB.DUE_DATE);
      } else if (bankName === 'HDFC') {
        data.accountSummary = {
          "Opening Balance": pdfParser.getTextByCoordinates(...PdfCoordinates.HDFC.OPENING_BALANCE),
          "Payments & Credits": pdfParser.getTextByCoordinates(...PdfCoordinates.HDFC.PAYMENTS_CREDITS),
          "Purchases & Debits": pdfParser.getTextByCoordinates(...PdfCoordinates.HDFC.PURCHASES_DEBITS),
          "Finance Charges": pdfParser.getTextByCoordinates(...PdfCoordinates.HDFC.FINANCE_CHARGES),
          "Total Due": pdfParser.getTextByCoordinates(...PdfCoordinates.HDFC.TOTAL_DUES)
        };
        data.totalCreditLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.HDFC.TOTAL_CREDIT_LIMIT);
        data.availableCreditLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.HDFC.AVAILABLE_CREDIT_LIMIT);
        data.availableCashLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.HDFC.AVAILABLE_CASH_LIMIT);
        data.dueDate = pdfParser.getTextByCoordinates(...PdfCoordinates.HDFC.DUE_DATE);
      } else if (bankName === 'AXIS') {
        data.accountSummary = {
          "Previous Balance": pdfParser.getTextByCoordinates(...PdfCoordinates.AXIS.PREVIOUS_BALANCE),
          "Payments": pdfParser.getTextByCoordinates(...PdfCoordinates.AXIS.PAYMENTS),
          "Credits": pdfParser.getTextByCoordinates(...PdfCoordinates.AXIS.CREDITS),
          "Purchases": pdfParser.getTextByCoordinates(...PdfCoordinates.AXIS.PURCHASES),
          "Cash Advance": pdfParser.getTextByCoordinates(...PdfCoordinates.AXIS.CASH_ADVANCE),
          "Other Debit and Charges": pdfParser.getTextByCoordinates(...PdfCoordinates.AXIS.OTHER_DEBIT_AND_CHARGES),
          "Total Due": pdfParser.getTextByCoordinates(...PdfCoordinates.AXIS.TOTAL_DUES)
        };
        data.totalCreditLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.AXIS.TOTAL_CREDIT_LIMIT);
        data.availableCreditLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.AXIS.AVAILABLE_CREDIT_LIMIT);
        data.availableCashLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.AXIS.AVAILABLE_CASH_LIMIT);
        data.dueDate = pdfParser.getTextByCoordinates(...PdfCoordinates.AXIS.DUE_DATE);
      } else if (bankName === 'ICICI') {
        data.accountSummary = {
          "Previous Balance": pdfParser.getTextByCoordinates(...PdfCoordinates.ICICI.PREVIOUS_BALANCE),
          "Purchases & Charges": pdfParser.getTextByCoordinates(...PdfCoordinates.ICICI.PURCHASES_CHARGES),
          "Cash Advances": pdfParser.getTextByCoordinates(...PdfCoordinates.ICICI.CASH_ADVANCES),
          "Payments & Credits": pdfParser.getTextByCoordinates(...PdfCoordinates.ICICI.PAYMENTS_CREDITS),
          "Total Due": pdfParser.getTextByCoordinates(...PdfCoordinates.ICICI.TOTAL_DUES)
        };
        data.totalCreditLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.ICICI.TOTAL_CREDIT_LIMIT);
        data.availableCreditLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.ICICI.AVAILABLE_CREDIT_LIMIT);
        data.availableCashLimit = pdfParser.getTextByCoordinates(...PdfCoordinates.ICICI.AVAILABLE_CASH_LIMIT);
        data.dueDate = pdfParser.getTextByCoordinates(...PdfCoordinates.ICICI.DUE_DATE);
      }

      setStatementDetails(data);
    } catch (error) {
      console.error('Error parsing PDF:', error);
      alert('Error parsing PDF: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>💳 Credit Card Statement Parser</h1>

      <div className="card">
        <label>Select Credit Card Issuer:</label>
        <select value={bankName} onChange={e => setBankName(e.target.value)}>
          {banknames.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <label>Upload PDF Statement:</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={e => setStatementPDF(e.target.files[0])}
        />

        <label>PDF Password (if any):</label>
        <input
          type="password"
          placeholder="Enter password"
          value={pdfPassword}
          onChange={e => setPdfPassword(e.target.value)}
        />

        <button onClick={handleGetStatementDetails} disabled={loading}>
          {loading ? 'Extracting...' : 'Get Statement Details'}
        </button>
      </div>

      {loading && <p className="loading-text">Reading PDF, please wait...</p>}

      {statementDetails && (
        <div className="results-card">
          <StatementDetails {...statementDetails} />
        </div>
      )}
    </div>
  );
}

export default App;
