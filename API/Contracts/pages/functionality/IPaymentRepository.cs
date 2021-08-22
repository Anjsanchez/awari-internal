using System.Threading.Tasks;
using API.Models.functionality;

namespace API.Contracts.pages.functionality
{
    public interface IPaymentRepository : IRepositoryBase<Payment>
    {
        Task<Payment> GetByName(string paymentName);
    }
}