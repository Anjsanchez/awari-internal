using System.Collections.Generic;
using API.Dto.trans.header;
using API.Dto.trans.line;
using API.Dto.trans.payment;
using API.Dto.trans.room;

namespace API.Data.ApiResponse
{
    public class TransHeaderResponse : AuthResult
    {
        public transHeaderReadDto header { get; set; }
        public List<transRoomReadDto> rooms { get; set; }
        public List<transPaymentReadDto> payments { get; set; }
        public List<transReadDto> trans { get; set; }
        public bool isTrans { get; set; } = true;
    }
}