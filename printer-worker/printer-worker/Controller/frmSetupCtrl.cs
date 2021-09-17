using resortPrintWorker.Helper;
using resortPrintWorker.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml;

namespace resortPrintWorker.Controller
{
    class frmSetupCtrl
    {
        frmSetupMdl _mdl;
        public frmSetupCtrl(frmSetupMdl mdl)
        {
            _mdl = mdl;
        }
        private void CreateXML()
        {

            if (!testConnection(true)) return;

            var gl = new globalXmlHelper();

          try
            {

                XmlWriterSettings xmlWriterSettings = new XmlWriterSettings()
                {
                    Indent = true,
                    IndentChars = "\t",
                    NewLineOnAttributes = true
                };

                using (XmlWriter w = XmlWriter.Create("resortMgmt.xml", xmlWriterSettings))
                {
                    w.WriteStartDocument();
                    w.WriteStartElement("resortMgmt");
                    w.WriteElementString("db_constring", gl.Encrypt(_mdl.getConstringValue(), "resortDb"));
                    w.WriteElementString("db_database", gl.Encrypt(_mdl.txtDb.Text, "resortDb"));
                    w.WriteElementString("db_server", gl.Encrypt(_mdl.txtServer.Text, "resortDb"));
                    w.WriteElementString("db_user", gl.Encrypt(_mdl.txtUser.Text, "resortDb"));
                    w.WriteElementString("db_pass", gl.Encrypt(_mdl.txtPass.Text, "resortDb"));
                    w.WriteEndElement();
                }

                MessageBox.Show("License successfully generated.");

                return;
            }
            catch (Exception ex)
            {
                MessageBox.Show("CreateXML: " + ex.Message);
                throw;
            }

        }
        public void saveConnection()
        {
            if (!globalFunctionalityHelper.MessageBoxYesNo()) return ;
            CreateXML();

            Process.GetCurrentProcess().Kill();
        }

        public bool testConnection(bool isSave = false)
        {
            var sqlConn = new SqlConnection();

            try
            {
                sqlConn.ConnectionString = _mdl.getConstringValue();
                sqlConn.Open();

                if (!isSave)
                    MessageBox.Show("Connection Success");

                return true;

            }
            catch (Exception ex)
            {

                MessageBox.Show("Connection failed: " + ex.Message);
                return false;
            }
        }
    }
}
