using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Linq;

namespace resortPrintWorker.Helper
{
    public class globalInitializeHelper
    {
        public bool InitializationChecking()
        {

            if (!CheckForOtherInitialization())
                return false;

            checkIfExistLogDirectory();

            if (!CheckIfConfigExist())
                return false;

            getConnectionString();
            return true;
        }

        private void getConnectionString()
        {
            var xml = new globalXmlHelper();

            var xDoc = XDocument.Load(AppDomain.CurrentDomain.BaseDirectory + "\\resortMgmt.xml");

            var results = xDoc.Root
                .Elements()
                .ToDictionary(e => e.Name, e => (string)e);

            globalSettings.connection.conString = xml.Decrypt(results["db_constring"], "resortDb");

        }

        private bool CheckIfConfigExist()
        {
            try
            {
                if (File.Exists(AppDomain.CurrentDomain.BaseDirectory + "\\resortMgmt.xml"))
                    return true;

                if (!globalFunctionalityHelper.MessageBoxYesNo("Print Worker license key not detected. Do you want to continue?"))
                    Process.GetCurrentProcess().Kill();

                return false;
            }
            catch (Exception ex)
            {
                MessageBox.Show("checkIfConfigExist method: " + ex.Message);
                throw;
            }
        }
        private bool CheckForOtherInitialization()
        {
            var MultipleInstance = GetInstanceName() + " is already running.";

            if (Process.GetProcessesByName(Path.GetFileNameWithoutExtension(Assembly.GetEntryAssembly().Location)).Count() > 1)
            {
                MessageBox.Show(MultipleInstance, "Multiple application is already running", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                Process.GetCurrentProcess().Kill();

                return false;
            }

            return true;
        }

        public static string GetInstanceName()
        {
            return "Resort Print Worker";
        }

        private void checkIfExistLogDirectory()
        {
            string _baseDirectory = AppDomain.CurrentDomain.BaseDirectory;

            try
            {
                if (!Directory.Exists(_baseDirectory + "\\printWorker_Logs"))
                    Directory.CreateDirectory(_baseDirectory + "\\printWorker_Logs");

                if (!Directory.Exists(_baseDirectory + "\\printWorker_Logs\\Error_Log"))
                    Directory.CreateDirectory(_baseDirectory + "\\printWorker_Logs\\Error_Log");
            }
            catch (Exception ex)
            {
                MessageBox.Show("CheckIfExistLogDirectory method " + ex.Message);
                throw;
            }
        }
    }
}
