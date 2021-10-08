using System;
using static API.Models.Enum.EnumModels;

namespace API.Dto.approval
{
    public class ReservationApprovalCreateDto
    {
        public Guid tmpTblId { get; set; }
        public Guid transId { get; set; }
        public EApprovalType approvalType { get; set; }
        public EAction action { get; set; }
        public Guid requestedById { get; set; }
        public string remark { get; set; }
    }
}