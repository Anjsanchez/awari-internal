using System.ComponentModel;

namespace API.Models.Enum
{
    public class EnumModels
    {
        public enum EApprovalType
        {
            Payment = 0,
            Rooms = 1,
            Trans = 2,
            Header = 3
        };

        public enum EAction
        {
            Delete = 0,
            Modify = 1,
            Add = 2
        }

        public enum Status
        {
            NotApplicable = 0,
            Pending = 1,
            Approved = 2,
            Rejected = 3
        }

        public enum PurchaseOrderStatus
        {
            Pending = 0,
            Rejected = 1,
            Approved = 2,
            Cancelled = 3
        }

        public enum TypeOfWork
        {
            Repair =0,
            Maintenance =1,
            Damaged = 2,
            General = 3,
            Landscaping = 4,
            Pool = 5,
            Electrical = 6,
            Plumbing = 7,
            Carpentry = 8,
            Cleaning = 9
        }

        public enum Location
        {
            Lobby,
            Pool,
            [Description("Sea Side")]
            SeaSide,
            Admin,
            Restroom,
            Guest,
            Staff,
            Receiving,
            Reception,
            Restaurant,
        }

        public enum InventoryAdjustmentType
        {
            Breakage = 0,
            Spoilage = 1,
            Stocktake = 2,
            Discrepancy = 3,
            Return = 4,
            Error = 5,
            Damaged = 6,
            Theft = 7,
            Audit = 8,
            Waste = 9
        }

        public enum RcvStatus
        {
            Unreceived = 0,
            Received = 1,
            Partial=2
        }
        public enum WorkStatus
        {
            Ongoing = 0,
            Finished = 1,
            Suspended = 2,
        }

        public enum AdjustmentAction
        {
            Decrease = 0,
            Increase = 1
        }
        public enum InventoryLocation
        {
            Main,
            Production
        }
    }
}