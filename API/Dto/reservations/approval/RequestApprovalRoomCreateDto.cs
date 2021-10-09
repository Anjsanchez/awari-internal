using API.Dto.approval;

namespace API.Dto.reservations
{
    public class RequestApprovalRoomCreateDto : RequestApprovalCreateDto
    {
        public ApprovalRoomCreateDto approvalRoom { get; set; }
    }
}