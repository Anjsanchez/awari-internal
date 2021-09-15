using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.trans;

namespace API.Contracts.pages.trans
{
    public interface ITransLineRepository : IRepositoryBase<TransLine>
    {
        Task<bool> deleteRange(List<TransLine> lines);
        Task<bool> createRange(List<TransLine> lines);
        Task<List<TransLine>> GetPaymentByHeaderId(Guid headerId);
    }
}