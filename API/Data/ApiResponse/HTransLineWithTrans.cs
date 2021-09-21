using System.Collections.Generic;
using API.Dto.reservations.trans;
using API.Dto.trans.line;

namespace API.Data.ApiResponse
{
    public class HTransLineWithTrans : AuthResult
    {
        public List<reservationTransReadDto> hLines { get; set; }
        public List<transReadDto> rLines { get; set; }
    }
}