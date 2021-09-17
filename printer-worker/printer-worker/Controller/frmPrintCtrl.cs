using resortPrintWorker.Model;
using System;
using System.Collections.Generic;
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
            //aps0tware12!@
            if (_mdl.txtPass.Text == "123") return true;
            return false;
        }
        public void HandleBtnLock()
        {
            if(_mdl.isLocked)
            if (!CheckIfPasswordMatch()) return;

            _mdl.isLocked = !_mdl.isLocked;

            if (_mdl.isLocked)
            {
                _mdl.btnPause.Enabled = false;
                _mdl.lblTimer.Visible = true;
                _mdl.btnLock.Text = "Unlock";
                _mdl.txtPass.ReadOnly = false;
            }
            else
            {
                _mdl.txtPass.ReadOnly = true;
                _mdl.lblTimer.Visible = false;
                _mdl.btnPause.Enabled = true;
                _mdl.btnLock.Text = "Lock";
            }
            _mdl.txtPass.Text = "";
        }
        public void HandleTimerTick()
        {
            //MessageBox.Show("qweqw");
        }


    }
}
