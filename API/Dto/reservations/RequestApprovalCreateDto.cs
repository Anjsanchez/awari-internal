using System;
using API.Dto.approval;

namespace API.Dto.reservations
{
    public class RequestApprovalCreateDto
    {
        public Guid transId { get; set; }
        public string approvalType { get; set; }
        public string action { get; set; }
        public Guid requestedById { get; set; }
        public string remark { get; set; }

        public ApprovalPaymentCreateDto approvalPayment { get; set; }
    }
}