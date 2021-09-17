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

        List<printObj>  _printObj;
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
            foreach (var item in _printers)
                if (item.ToLower() == printerName.ToLower())
                    return true;

            return false;
        }

        public void InitiatePrint(List<printObj>  printObj)
        {
            _printObj = printObj;

            if (!checkIfPrinterExist(_printObj[0].printerName)) return;

            var doc = new PrintDocument();

            var printController = new StandardPrintController();
            doc.PrintPage += new PrintPageEventHandler(PrintReceiptPOSReturn);


            doc.PrintController = printController;
            PrinterSettings ps = new PrinterSettings();
            ps.PrinterName = _printObj[0].printerName;
            doc.PrinterSettings = ps;
            doc.Print();
            doc.Dispose();
        }

        private void PrintReceiptPOSReturn(object sender, PrintPageEventArgs e)
        {

            try
            {

                Graphics graphics = e.Graphics;

                Font font10 = new Font("Courier New", 10);
                Font font12 = new Font("Courier New", 7);
                Font ftnBusinessName = new Font("Courier New", 13, FontStyle.Bold);
                Font fntForFooter = new Font("Courier New", 2);

                float leading = 4;
                float lineheight12 = font12.GetHeight() + leading;
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

                SizeF layoutSize = new SizeF(180 - Offset * 2, lineheight14);
                RectangleF layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                Brush brush = Brushes.Black;

                //graphics.DrawString(GlobalCurrentSettings.compSettingsMdl.CompanyName, ftnBusinessName, brush, layout, formatCenter);
                //Offset = Offset + lineheight14;
                //layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                //graphics.DrawString($"{GlobalCurrentSettings.compSettingsMdl.companyAddress1}\n {GlobalCurrentSettings.compSettingsMdl.companyAddress2}", font12, brush, layout, formatCenter);
                //Offset = Offset + lineheight14;
                //layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                //graphics.DrawString(GlobalCurrentSettings.compSettingsMdl.companyTin, font12, brush, layout, formatCenter);
                //Offset = Offset + lineheight12;
                //layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                ////.ToString("MMM dd yyyy")  
                //graphics.DrawString(_mdl.dateReceipt, font12, brush, layout, formatLeft);
                //graphics.DrawString(_mdl.timeReceipt, font12, brush, layout, formatRight);
                //Offset = Offset + lineheight12;
                //layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                //graphics.DrawString("CASHIER : " + _mdl.cashieruser, font12, brush, layout, formatLeft);
                //Offset = Offset + lineheight12;
                //layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                //graphics.DrawString("OR : " + _mdl.transid, font12, brush, layout, formatLeft);
                //Offset = Offset + lineheight12;
                //layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                graphics.DrawString("".PadRight(20, '*'), font10, brush, layout, formatLeft);
                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                graphics.DrawString("RETURN", font12, brush, layout, formatCenter);
                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                graphics.DrawString("".PadRight(20, '*'), font10, brush, layout, formatLeft);
                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                //foreach (var item in _mdl.listOfDetailsItems)
                //{

                //    graphics.DrawString($"{item.description} \n \t {item.Qty} @ {item.sellingPrice}", font12, brush, layout, formatLeft);
                //    graphics.DrawString("\n-" + item.subtotal, font12, brush, layout, formatRight);
                //    Offset = Offset + lineheight12;
                //    layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                //    Offset = Offset + lineheight12;
                //    layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                //}

                //graphics.DrawString("Items : " + _mdl.numberOfItems, font12, brush, layout, formatLeft);
                //Offset = Offset + lineheight12;
                //layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                //graphics.DrawString("".PadRight(20, '-'), font10, brush, layout, formatLeft);
                //Offset = Offset + lineheight12;
                //layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);


                //graphics.DrawString("Total  ", font12, brush, layout, formatLeft);
                //graphics.DrawString("-" + _mdl.totalAmount, font12, brush, layout, formatRight);
                //Offset = Offset + lineheight12;
                //layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);



                //graphics.DrawString("THANK YOU AND COME AGAIN", font12, brush, layout, formatCenter);
                //Offset = Offset + lineheight12;
                //layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                //if (isRePrint)
                //{
                //    graphics.DrawString("***REPRINTED***", font12, brush, layout, formatCenter);
                //    Offset = Offset + lineheight12;
                //    layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                //}

                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);
                Offset = Offset + lineheight12;
                layout = new RectangleF(new PointF(startX, startY + Offset), layoutSize);

                graphics.DrawString(".", fntForFooter, brush, layout, formatCenter);
                Offset = Offset + lineheight12;

                font10.Dispose(); font12.Dispose(); ftnBusinessName.Dispose(); fntForFooter.Dispose();

            }
            catch (Exception ex)
            {
                MessageBox.Show("PrinterHelper: " + ex.Message);
            }
        }





    }
}
