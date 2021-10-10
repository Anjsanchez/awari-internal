using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace resortPrintWorker.Model
{
    class printObj
    {
        public string reservationHeaderId { get; set; }
        public string productCategoryId { get; set; }
        public string customerName { get; set; }
        public string staffName { get; set; }
        public string roomLongName { get; set; }
        public string productName { get; set; }
        public string catName { get; set; }
        public string printerName { get; set; }
        public string quantity { get; set; }
        public string remark { get; set; }
        public string isPrinted { get; set; }
        public int slipNumber { get; set; } = 1;
    }
}
