using resortPrintWorker.Controller;
using resortPrintWorker.Helper;
using resortPrintWorker.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace resortPrintWorker.View
{
    public partial class frmPrint : Form
    {
        frmPrintCtrl _ctrl;
        public frmPrint()
        {
            InitializeComponent();


            var x = new frmPrintMdl()
            {
                tmrPrint = tmrPrint,
                btnPause = btnPause,
                lblTimer = lblTimer,
                btnLock = btnLock,
                txtPass = txtPass
            };

            _ctrl = new frmPrintCtrl(x);
        }

        private void tmrPrint_Tick(object sender, EventArgs e)
        {
            _ctrl.HandleTimerTick();
        }

        private void btnPause_Click(object sender, EventArgs e)
        {
            _ctrl.handleTimerAction();
        }

        private void btnLock_Click(object sender, EventArgs e)
        {
            _ctrl.HandleBtnLock();
        }

        private void frmPrint_FormClosing(object sender, FormClosingEventArgs e)
        {
            e.Cancel = true;
        }

        private void button1_Click(object sender, EventArgs e)
        {


            var query = @"SELECT 
                    TR.reservationHeaderId,
                    CONCAT(C.FirstName,' ',C.lastName) as 'customerName',
                    CONCAT(U.FirstName,' ',U.lastName) as 'staffName' ,
                    R.roomLongName ,
                    PC.name as'catName',
					pc.printerName,
                    P.longName as 'productName', 
                    TR.quantity,
                    TR.remark,
                    TR.isPrinted  
                    FROM ReservationTransLines TR 
                    JOIN Products P ON P._id = TR.productId
                    JOIN ProductCategories PC ON PC._id = P.productCategoryId
                    JOIN ReservationRoomLines RL on RL._id = TR.reservationRoomLineId
                    JOIN Rooms R ON rl.roomId = R._id
                    JOIN Users U ON tr.createdBy = U.Id
                    JOIN ReservationHeaders RH ON RH._id = TR.reservationHeaderId
                    JOIN Customers C ON c._id = RH.customerId
                    WHERE TR.isPrinted  = '1'
                    ORDER BY TR.reservationHeaderId, PC.name";

            var dt = globalSqlHelper.DbSelect(query); 
            if (dt.Rows.Count == 0) return;

            var lastHeaderId = "";

            var numberNames = new List<List<printObj>>();
            var tmp = new List<printObj>();

            lastHeaderId = dt.Rows[0]["reservationHeaderId"].ToString();

            foreach (DataRow item in dt.Rows)
            {
                if (lastHeaderId != item["reservationHeaderId"].ToString())
                {
                    numberNames.Add(tmp);
                    tmp = new List<printObj>();
                }

                lastHeaderId = item["reservationHeaderId"].ToString();

                var obj = new printObj
                {
                    customerName = item["customerName"].ToString(),
                    isPrinted = item["isPrinted"].ToString(),
                    catName = item["catName"].ToString(),
                    printerName = item["printerName"].ToString(),
                    productName = item["productName"].ToString(),
                    quantity = item["quantity"].ToString(),
                    remark = item["remark"].ToString(),
                    reservationHeaderId = item["reservationHeaderId"].ToString(),
                    roomLongName = item["roomLongName"].ToString(),
                    staffName = item["staffName"].ToString()
                };

                tmp.Add(  obj);
            }
            numberNames.Add(tmp); 

            var listByCategory = new List<List<printObj>>();
            var tmpCategory = new List<printObj>();
            var lastCategory = ""; 

            foreach (var item in numberNames)   
            {
                lastCategory = item[0].catName;
                tmpCategory = new List<printObj>();
                foreach (var subItem in item)
                {
                    if(lastCategory != subItem.catName)
                    {
                        listByCategory.Add(tmpCategory);
                        tmpCategory = new List<printObj>();
                    }

                    lastCategory = subItem.catName; 
                    tmpCategory.Add(subItem);
                }
                listByCategory.Add(tmpCategory);
            }


            var printrHlpr = new globalPrinterHelper();
            foreach (var item in listByCategory)
            {
                printrHlpr.InitiatePrint(item);
            }

        }
    }
}
