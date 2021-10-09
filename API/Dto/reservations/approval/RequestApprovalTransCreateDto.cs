using API.Dto.approval;

namespace API.Dto.reservations
{
    public class RequestApprovalTransCreateDto : RequestApprovalCreateDto
    {
        public ApprovalTransCreateDto approvalTrans { get; set; }
    }
}