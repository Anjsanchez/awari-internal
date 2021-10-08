using System;
using API.Models;
using static API.Models.Enum.EnumModels;

namespace API.Dto.approval
{
    public class ReservationApprovalReadDto
    {
        public Guid _id { get; set; }
        public Guid tmpTblId { get; set; }
        public Guid transId { get; set; }
        public EApprovalType approvalType { get; set; }
        public EAction action { get; set; }
        public Status status { get; set; }
        public string remark { get; set; }

        public User requestedBy { get; set; }
        public DateTime requestedDate { get; set; }

        public User approvedBy { get; set; }
        public DateTime approvedDate { get; set; }
    }
}