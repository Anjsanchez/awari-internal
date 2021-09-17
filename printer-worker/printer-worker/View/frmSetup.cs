using resortPrintWorker.Controller;
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
    public partial class frmSetup : Form
    {
         frmSetupCtrl _ctrl;
        public frmSetup()
        {
            InitializeComponent();

            var mdl = new frmSetupMdl()
            {
                txtDb = txtDb,
                txtServer = txtServer,
                txtPass = txtPassword,
                txtUser = txtUser
            };


            _ctrl = new frmSetupCtrl(mdl);
        }

        private void btnTest_Click(object sender, EventArgs e)
        {
            _ctrl.testConnection();
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            _ctrl.saveConnection();
        }
    }
}
