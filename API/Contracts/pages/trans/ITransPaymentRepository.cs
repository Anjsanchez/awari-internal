using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.trans;

namespace API.Contracts.pages.trans
{
    public interface ITransPaymentRepository : IRepositoryBase<TransPayment>
    {
        Task<bool> createRange(List<TransPayment> lines);
        Task<bool> deleteRange(List<TransPayment> lines);
        Task<List<TransPayment>> GetPaymentByHeaderId(Guid headerId);
    }
}