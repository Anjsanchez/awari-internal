using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace resortPrintWorker.Helper
{
    public static class globalFunctionalityHelper
    {

        public static bool MessageBoxYesNo(string title = "Confirmation", string message = "Are you sure you want to proceed?")
        {

            if (MessageBox.Show(message,title, MessageBoxButtons.YesNo, MessageBoxIcon.Question) == System.Windows.Forms.DialogResult.No) return false;

            return true;
        }   
    }
}
