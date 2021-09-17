using resortPrintWorker.Helper;
using resortPrintWorker.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace resortPrintWorker
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            var initialization = new globalInitializeHelper();


            if (!initialization.InitializationChecking())
            {
                Application.Run(new frmSetup());
                return;
            }



            Application.Run(new frmPrint());
        }
    }
}
