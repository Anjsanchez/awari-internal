using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.trans;

namespace API.Contracts.pages.trans
{
    public interface ITransRoomRepository : IRepositoryBase<TransRoom>
    {
        Task<bool> deleteRange(List<TransRoom> lines);
        Task<List<TransRoom>> GetLineByHeaderId(Guid headerId);
        Task<ICollection<TransRoom>> getLineByDates(DateTime fromDate, DateTime toDate);
        Task<bool> createRange(List<TransRoom> lines);


    }
}