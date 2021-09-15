using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dto.trans.header;
using API.Models.trans;

namespace API.Contracts.pages.trans
{
    public interface ITransHeaderRepository : IRepositoryBase<TransHeader>
    {
        Task<List<TransHeader>> GetHeaderByCustomerID(Guid customerId);
        Task<List<transHeaderReadDto>> GetHeaderWithRoomCount();
        Task<TransHeader> GetHeadersWithFullDetails(Guid HeaderId);
    }
}