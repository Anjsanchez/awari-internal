using resortPrintWorker.Model;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace resortPrintWorker.Helper
{
    class globalPrinterHelper
    {

        List<printObj> _printObj;
        List<string> _printers;

        public globalPrinterHelper()
        {
            getAllPrinters();
        }

        private void getAllPrinters()
        {
            _printers = new List<string>();

            foreach (string printer in System.Drawing.Printing.PrinterSettings.InstalledPrinters)
                _printers.Add(printer);
        }
        private bool checkIfPrinterExist(string printerName)
        {

            if (string.IsNullOrEmpty(printerName)) return false;

            foreach (var item in _printers)
                if (item.ToLower() == printerName.ToLower())
                    return true;

            return false;
        }

        public bool InitiatePrint(List<printObj> printObj)
        {
            try
            {
                _printObj = printObj;

                if (!checkIfPrinterExist(_printObj[0].printerName)) return false;

                var doc = new PrintDocument();

                var printController = new StandardPrintController();
                doc.PrintPage += new PrintPageEventHandler(PrintReceipt);


                doc.PrintController = printController;
                PrinterSettings ps = new PrinterSettings();
                ps.PrinterName = _printObj[0].printerName;
                doc.PrinterSettings = ps;
                doc.Print();
                doc.Dispose();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private void PrintReceipt(object sender, PrintPageEventArgs e)
        {
            try
            {
                Graphics graphics = e.Graphics;

                Font font9 = new Font("Courier New", 9);
                Font font8 = new Font("Courier New", 8);
                Font ftnBusinessName = new Font("Courier New", 18, FontStyle.Bold);
                Font ftnSlipNumber = new Font("Courier New", 22, FontStyle.Bold);
                Font fntForFooter = new Font("Courier New", 2);

                float leading = 0;
                float lineheight12 = font8.GetHeight() + leading;
                float lineheight14 = ftnBusinessName.GetHeight() + leading;

                float startX = 0;
                float startY = leading;
                float Offset = 0;

                StringFormat formatLeft = new StringFormat(StringFormatFlags.NoClip);
                StringFormat formatCenter = new StringFormat(formatLeft);
                StringFormat formatRight = new StringFormat(formatLeft);

                formatCenter.Alignment = StringAlignment.Center;
                formatRight.Alignment = StringAlignment.Far;
                formatLeft.Alignment = StringAlignment.Near;

                SizeF layoutSize = new SizeF(250 - Offset * 2, lineheight14);
                RectangleF layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                Brush brush = Brushes.Black;

                graphics.DrawString("ORDER SLIP", ftnBusinessName, brush, layout, formatCenter);
                Offset = Offset + lineheight14;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                Offset = Offset + lineheight12;

                graphics.DrawString(_printObj[0].slipNumber.ToString(), ftnSlipNumber, brush, layout, formatCenter);
                Offset = Offset + lineheight14;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                Offset = Offset + lineheight12;

                //.ToString("MMM dd yyyy")  
                graphics.DrawString(DateTime.Now.ToString("MMM dd yyyy"), font9, brush, layout, formatLeft);
                graphics.DrawString(DateTime.Now.ToLongTimeString(), font9, brush, layout, formatRight);

                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                graphics.DrawString("STAFF  ", font9, brush, layout, formatLeft);
                graphics.DrawString(_printObj[0].staffName, font9, brush, layout, formatRight);

                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                graphics.DrawString("".PadRight(31, '*'), font9, brush, layout, formatLeft);

                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                Offset = Offset + lineheight12 - 4;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                int totalOrder = 0;
                var last = _printObj.Last();

                foreach (var item in _printObj)
                {
                    var remarkName = item.remark.Length == 0 || string.IsNullOrEmpty(item.remark) ? "" : $"- {item.remark}";
                    totalOrder += int.Parse(item.quantity);

                    graphics.DrawString($"{item.productName} \n \t{remarkName}", font9, brush, layout, formatLeft);
                    graphics.DrawString(item.quantity, font9, brush, layout, formatRight);
                    layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                    if (item.Equals(last))
                    {

                        if (!string.IsNullOrEmpty(remarkName))
                        {
                            Offset = Offset + lineheight12;
                            layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                        }

                        Offset = Offset + lineheight12;
                        layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                        Offset = Offset + lineheight12;
                        layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                        continue;
                    }

                    if (string.IsNullOrEmpty(remarkName))
                    {
                        Offset = Offset + lineheight12;
                        layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                        continue;
                    }
                    Offset = Offset + lineheight12 + 5;
                    Offset = Offset + lineheight12;
                    layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                }

                graphics.DrawString("".PadRight(31, '*'), font9, brush, layout, formatLeft);

                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                graphics.DrawString("TOTAL ORDER : ", font9, brush, layout, formatLeft);
                graphics.DrawString(totalOrder.ToString(), font9, brush, layout, formatRight);
                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                graphics.DrawString("ROOM  ", font9, brush, layout, formatLeft);
                graphics.DrawString(_printObj[0].roomLongName, font9, brush, layout, formatRight);

                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                graphics.DrawString("GUEST  ", font9, brush, layout, formatLeft);
                graphics.DrawString(_printObj[0].customerName, font9, brush, layout, formatRight);
                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                graphics.DrawString(".", font9, brush, layout, formatCenter);

                font9.Dispose(); font8.Dispose(); ftnBusinessName.Dispose(); fntForFooter.Dispose();

            }
            catch (Exception ex)
            {
                MessageBox.Show("PrinterHelper: " + ex.Message);
            }
        }





    }
}
