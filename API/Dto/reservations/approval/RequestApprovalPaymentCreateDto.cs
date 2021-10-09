using API.Dto.approval;

namespace API.Dto.reservations
{
    public class RequestApprovalPaymentCreateDto : RequestApprovalCreateDto
    {
        public ApprovalPaymentCreateDto approvalPayment { get; set; }
    }
}