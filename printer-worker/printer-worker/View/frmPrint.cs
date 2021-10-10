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
                txtInterval = txtInterval,
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
            _ctrl.HandleTimerTick();
        }
    }
}
