namespace API.Models.Enum
{
    public class EnumModels
    {
        public enum EApprovalType
        {
            Payment = 0,
            Rooms = 1,
            Trans = 2,
            Product = 3,
        };

        public enum EAction
        {
            Delete = 0,
            Modified = 1,
        }
        public enum Status
        {
            Pending = 0,
            Approved = 1,
            Rejected = 2
        }
    }
}