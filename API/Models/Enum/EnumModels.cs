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
            Approved = 2
        }

        public enum RcvStatus
        {
            Unreceived = 0,
            Received = 1,
        }
    }
}