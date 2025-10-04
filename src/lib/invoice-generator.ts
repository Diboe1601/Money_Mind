import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface InvoiceData {
  invoice_number: string;
  client_name: string;
  amount: number;
  description: string | null;
  due_date: string;
  status: string;
  created_at: string;
}

export const generateInvoicePDF = (invoice: InvoiceData) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('INVOICE', 105, 20, { align: 'center' });
  
  // Add invoice details
  doc.setFontSize(12);
  doc.text(`Invoice Number: ${invoice.invoice_number}`, 20, 40);
  doc.text(`Date: ${new Date(invoice.created_at).toLocaleDateString()}`, 20, 50);
  doc.text(`Due Date: ${new Date(invoice.due_date).toLocaleDateString()}`, 20, 60);
  doc.text(`Status: ${invoice.status.toUpperCase()}`, 20, 70);
  
  // Add client info
  doc.text('Bill To:', 20, 90);
  doc.text(invoice.client_name, 20, 100);
  
  // Add invoice items table
  autoTable(doc, {
    startY: 120,
    head: [['Description', 'Amount']],
    body: [
      [invoice.description || 'Service rendered', `$${invoice.amount.toLocaleString()}`],
    ],
    foot: [['Total', `$${invoice.amount.toLocaleString()}`]],
    theme: 'striped',
  });
  
  // Save the PDF
  doc.save(`invoice-${invoice.invoice_number}.pdf`);
};
