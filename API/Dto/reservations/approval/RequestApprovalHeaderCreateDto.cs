using API.Dto.approval;
using API.Dto.approval.header;

namespace API.Dto.reservations
{
    public class RequestApprovalHeaderCreateDto : RequestApprovalCreateDto
    {
        public ApprovalHeaderCreateDto approvalHeader { get; set; }
    }
}