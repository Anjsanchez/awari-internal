using System.Threading.Tasks;
using API.Models.functionality;

namespace API.Contracts.pages.functionality
{
    public interface IDiscountRepository : IRepositoryBase<Discount>
    {
        Task<Discount> GetByName(string discountName);
    }
}