using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace resortPrintWorker.Model
{
    class frmPrintMdl
    {
        public TextBox txtPass { get; set; }
        public TextBox txtInterval { get; set; }
        public Timer tmrPrint { get; set; }
        public Button btnPause { get; set; }
        public Button btnLock { get; set; }
        public Label lblTimer { get; set; }
        public bool isLocked { get; set; } = true;
    }
}
