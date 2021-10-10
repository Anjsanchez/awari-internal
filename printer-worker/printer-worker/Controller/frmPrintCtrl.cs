using resortPrintWorker.Helper;
using resortPrintWorker.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace resortPrintWorker.Controller
{
    class frmPrintCtrl
    {
        frmPrintMdl _mdl;
        public frmPrintCtrl(frmPrintMdl mdl)
        {
            _mdl = mdl;
        }

        public void handleTimerAction()
        {
            _mdl.tmrPrint.Enabled = !_mdl.tmrPrint.Enabled;

            if (_mdl.tmrPrint.Enabled) _mdl.btnPause.Text = "Pause";
            else
                _mdl.btnPause.Text = "Resume";
        }

        private bool CheckIfPasswordMatch()
        {
            if (_mdl.txtPass.Text == "Pangan040899096920") return true;
            return false;
        }
        public void HandleBtnLock()
        {
            if (_mdl.isLocked)
                if (!CheckIfPasswordMatch()) return;

            _mdl.isLocked = !_mdl.isLocked;

            if (_mdl.isLocked)
            {
                _mdl.tmrPrint.Interval = int.Parse(_mdl.txtInterval.Text);
                _mdl.btnPause.Enabled = false;
                _mdl.lblTimer.Visible = true;
                _mdl.btnLock.Text = "Unlock";
                _mdl.txtPass.ReadOnly = false;
                _mdl.txtInterval.ReadOnly = true;
            }
            else
            {
                _mdl.txtInterval.ReadOnly = false;
                _mdl.txtPass.ReadOnly = true;
                _mdl.lblTimer.Visible = false;
                _mdl.btnPause.Enabled = true;
                _mdl.btnLock.Text = "Lock";
            }
            _mdl.txtPass.Text = "";
        }
        public void HandleTimerTick()
        {

            try
            {

                var query = @"SELECT 
                    TR.reservationHeaderId,
                    P.productCategoryId,
                    CONCAT(C.FirstName,' ',C.lastName) as 'customerName',
                    CONCAT(U.FirstName,' ',U.lastName) as 'staffName' ,
                    ISNULL(R.roomLongName, PC.name) as 'roomLongName' ,
                    PC.name as'catName',
					pc.printerName,
                    P.shortName as 'productName', 
                    TR.quantity,
                    TR.remark,
                    TR.isPrinted  
                    FROM ReservationTransLines TR 
                    JOIN Products P ON P._id = TR.productId
                    JOIN ProductCategories PC ON PC._id = P.productCategoryId
                    LEFT JOIN ReservationRoomLines RL on RL._id = TR.reservationRoomLineId
                    LEFT JOIN Rooms R ON rl.roomId = R._id
                    JOIN Users U ON tr.createdBy = U.Id
                    JOIN ReservationHeaders RH ON RH._id = TR.reservationHeaderId
                    JOIN Customers C ON c._id = RH.customerId
                    WHERE TR.isPrinted  = '0'
                    ORDER BY TR.reservationHeaderId, PC.name";

                var dt = globalSqlHelper.DbSelect(query);
                if (dt.Rows.Count == 0) return;

                var lastHeaderId = "";

                var numberNames = new List<List<printObj>>();
                var tmp = new List<printObj>();
                int localSlipNumber = Properties.Settings.Default.slipNumber;
                DateTime localDateTime = Properties.Settings.Default.currentDate;

                if(localDateTime.Date != DateTime.Now.Date)
                {
                    localDateTime = DateTime.Now;
                    localSlipNumber = 1;
                }

                lastHeaderId = dt.Rows[0]["reservationHeaderId"].ToString();

                foreach (DataRow item in dt.Rows)
                {
                    if (lastHeaderId != item["reservationHeaderId"].ToString())
                    {
                        numberNames.Add(tmp);
                        tmp = new List<printObj>();
                        localSlipNumber++;
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
                        productCategoryId = item["productCategoryId"].ToString(),
                        roomLongName = item["roomLongName"].ToString(),
                        staffName = item["staffName"].ToString(),
                        slipNumber = localSlipNumber
                    };

                    tmp.Add(obj);
                }

                Properties.Settings.Default.currentDate = localDateTime;
                Properties.Settings.Default.slipNumber = localSlipNumber;
                Properties.Settings.Default.Save();
                Properties.Settings.Default.Upgrade();
                Properties.Settings.Default.Reload();
                MessageBox.Show(Properties.Settings.Default.slipNumber.ToString(), "EES");
                MessageBox.Show(localSlipNumber.ToString(), "EES");
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
                        if (lastCategory != subItem.catName)
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
                    if (!printrHlpr.InitiatePrint(item)) continue;

                     executeUpdateRecord(item[0].reservationHeaderId, item[0].productCategoryId);
                }
            }
            catch (Exception ex)
            {
            }
        }

        private void executeUpdateRecord(string header, string catId)
        {
            var query = $@"UPDATE TR 
                        SET isPrinted='1' 
                        FROM ReservationTransLines TR 
                        JOIN Products P 
                        ON TR.productId = P._id  
                        WHERE reservationHeaderId ='{header}' 
                        AND P.productCategoryId ='{catId}'";

            globalSqlHelper.DbExecute(query);
        }


    }
}
