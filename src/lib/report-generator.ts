import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Transaction } from '@/hooks/use-transactions';
import { format } from 'date-fns';

export const generateMonthlyFinancialReport = (transactions: Transaction[]) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(18);
  doc.text('Monthly Financial Report', 14, 20);
  
  // Date
  doc.setFontSize(10);
  doc.text(`Generated: ${format(new Date(), 'PPP')}`, 14, 30);
  
  // Calculate totals
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const netIncome = income - expenses;
  
  // Summary
  doc.setFontSize(12);
  doc.text('Summary', 14, 40);
  doc.setFontSize(10);
  doc.text(`Total Income: $${income.toFixed(2)}`, 14, 48);
  doc.text(`Total Expenses: $${expenses.toFixed(2)}`, 14, 54);
  doc.text(`Net Income: $${netIncome.toFixed(2)}`, 14, 60);
  
  // Transactions table
  autoTable(doc, {
    startY: 70,
    head: [['Date', 'Description', 'Category', 'Type', 'Amount', 'Status']],
    body: transactions.map(t => [
      format(new Date(t.date), 'PP'),
      t.description,
      t.category,
      t.type,
      `$${Number(t.amount).toFixed(2)}`,
      t.status
    ]),
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229] }
  });
  
  doc.save('monthly-financial-report.pdf');
};

export const generateTaxSummary = (transactions: Transaction[]) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(18);
  doc.text('Tax Summary Report', 14, 20);
  
  // Date
  doc.setFontSize(10);
  doc.text(`Generated: ${format(new Date(), 'PPP')}`, 14, 30);
  doc.text(`Tax Year: ${new Date().getFullYear()}`, 14, 36);
  
  // Calculate income by category
  const incomeByCategory: Record<string, number> = {};
  const expenseByCategory: Record<string, number> = {};
  
  transactions.forEach(t => {
    if (t.type === 'income') {
      incomeByCategory[t.category] = (incomeByCategory[t.category] || 0) + Number(t.amount);
    } else {
      expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + Number(t.amount);
    }
  });
  
  // Income breakdown
  doc.setFontSize(12);
  doc.text('Income Breakdown', 14, 46);
  
  autoTable(doc, {
    startY: 52,
    head: [['Category', 'Amount']],
    body: Object.entries(incomeByCategory).map(([category, amount]) => [
      category,
      `$${amount.toFixed(2)}`
    ]),
    theme: 'striped',
    headStyles: { fillColor: [34, 197, 94] }
  });
  
  // Expense breakdown
  const finalY = (doc as any).lastAutoTable.finalY || 52;
  doc.setFontSize(12);
  doc.text('Deductible Expenses', 14, finalY + 10);
  
  autoTable(doc, {
    startY: finalY + 16,
    head: [['Category', 'Amount']],
    body: Object.entries(expenseByCategory).map(([category, amount]) => [
      category,
      `$${amount.toFixed(2)}`
    ]),
    theme: 'striped',
    headStyles: { fillColor: [239, 68, 68] }
  });
  
  doc.save('tax-summary-report.pdf');
};

export const generatePerformanceAnalytics = (transactions: Transaction[]) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(18);
  doc.text('Performance Analytics Report', 14, 20);
  
  // Date
  doc.setFontSize(10);
  doc.text(`Generated: ${format(new Date(), 'PPP')}`, 14, 30);
  
  // KPIs
  const totalTransactions = transactions.length;
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;
  const pendingTransactions = transactions.filter(t => t.status === 'pending').length;
  const cancelledTransactions = transactions.filter(t => t.status === 'cancelled').length;
  
  const avgTransactionValue = transactions.reduce((sum, t) => sum + Number(t.amount), 0) / totalTransactions || 0;
  
  // KPI Summary
  doc.setFontSize(12);
  doc.text('Key Performance Indicators', 14, 40);
  doc.setFontSize(10);
  doc.text(`Total Transactions: ${totalTransactions}`, 14, 48);
  doc.text(`Completed: ${completedTransactions}`, 14, 54);
  doc.text(`Pending: ${pendingTransactions}`, 14, 60);
  doc.text(`Cancelled: ${cancelledTransactions}`, 14, 66);
  doc.text(`Average Transaction Value: $${avgTransactionValue.toFixed(2)}`, 14, 72);
  doc.text(`Completion Rate: ${((completedTransactions / totalTransactions) * 100).toFixed(1)}%`, 14, 78);
  
  // Monthly trend
  const monthlyData: Record<string, { income: number; expense: number }> = {};
  
  transactions.forEach(t => {
    const month = format(new Date(t.date), 'MMM yyyy');
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }
    if (t.type === 'income') {
      monthlyData[month].income += Number(t.amount);
    } else {
      monthlyData[month].expense += Number(t.amount);
    }
  });
  
  // Monthly trend table
  autoTable(doc, {
    startY: 88,
    head: [['Month', 'Income', 'Expenses', 'Net']],
    body: Object.entries(monthlyData).map(([month, data]) => [
      month,
      `$${data.income.toFixed(2)}`,
      `$${data.expense.toFixed(2)}`,
      `$${(data.income - data.expense).toFixed(2)}`
    ]),
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229] }
  });
  
  doc.save('performance-analytics-report.pdf');
};
