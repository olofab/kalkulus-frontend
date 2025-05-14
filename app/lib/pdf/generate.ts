// /app/lib/pdf/generateOfferPdf.ts
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Offer } from '../../types/offer'

export default function generateOfferPdf(offer: Offer) {
  const doc = new jsPDF()

  // Header
  doc.setFontSize(12)
  doc.text('Kalkulus AS', 14, 20)
  doc.text('Tilbudsnr. ' + offer.id, 160, 20, { align: 'right' })

  doc.text('Kunde:', 14, 30)
  doc.text(offer.customer, 14, 36)

  doc.text('Dato:', 160, 30, { align: 'right' })
  doc.text(new Date(offer.updatedAt).toLocaleDateString('no-NO'), 160, 36, { align: 'right' })

  // Items table
  const tableData = offer.items.map((item) => [
    item.name,
    item.quantity + ' stk',
    item.unitPrice.toFixed(2) + ' kr',
    (item.unitPrice * item.quantity).toFixed(2) + ' kr'
  ])

  autoTable(doc, {
    startY: 50,
    head: [['Beskrivelse', 'Antall', 'Enhetspris', 'Sum']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [240, 240, 240], textColor: 0 },
    bodyStyles: { textColor: 50 },
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: {
      2: { halign: 'right' },
      3: { halign: 'right' }
    }
  })

  // Summary box
  const total = offer.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const vat = total * 0.25
  const grand = total + vat

  const tableEndY = (doc as any).previousAutoTable?.finalY ?? 80
  const summaryY = tableEndY + 14

  doc.setFontSize(11)
  doc.text('Betalingsinformasjon', 14, summaryY)

  autoTable(doc, {
    startY: summaryY + 4,
    body: [
      ['Netto', total.toFixed(2) + ' kr'],
      ['Mva 25%', vat.toFixed(2) + ' kr'],
      ['Total å betale', grand.toFixed(2) + ' kr']
    ],
    theme: 'plain',
    styles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { halign: 'right' }
    }
  })

  doc.save(`tilbud_${offer.id}.pdf`)
}