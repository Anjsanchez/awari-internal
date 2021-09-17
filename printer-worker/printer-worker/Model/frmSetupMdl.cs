using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace resortPrintWorker.Model
{
    public class frmSetupMdl
    {
        public TextBox txtServer { get; set; }
        public TextBox txtDb { get; set; }
        public TextBox txtUser { get; set; }
        public TextBox txtPass { get; set; }

        public string getConstringValue()
        {
            return $"Persist Security Info=True;MultipleActiveResultSets=true;Data " +
                                   $"Source={this.txtServer.Text};UID={this.txtUser.Text};" +
                                   $"PWD={this.txtPass.Text};Initial Catalog={this.txtDb.Text}";
        }
    }
}
