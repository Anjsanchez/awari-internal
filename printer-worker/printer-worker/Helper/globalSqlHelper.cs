using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace resortPrintWorker.Helper
{
    public static class globalSqlHelper
    {
        public static DataTable DbSelect(string commandSelect)
        {
            using (SqlConnection sqlConn = new SqlConnection(globalSettings.connection.conString))
            {
                try
                {
                    sqlConn.Open();
                    var dt = new DataTable();
                    using (var sqlComm = sqlConn.CreateCommand())
                    {

                        sqlComm.CommandText = commandSelect;
                        sqlComm.CommandTimeout = 0;

                        dt.Load(sqlComm.ExecuteReader());
                        sqlComm.Dispose();
                    }
                    sqlConn.Close();
                    return dt;
                }
                catch (Exception ex)
                {
                    throw null;
                }
            }
        }

        public static bool DbExecute(string commandQuery)
        {
            using (SqlConnection sqlConn = new SqlConnection(globalSettings.connection.conString))
            {
                try
                {
                    sqlConn.Open();
                    using (var sqlComm = sqlConn.CreateCommand())
                    {

                        sqlComm.CommandTimeout = 0;
                        sqlComm.CommandText = commandQuery;
                        sqlComm.ExecuteScalar();

                        sqlComm.Dispose();
                        sqlConn.Close();
                        return true;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }
    }
}
