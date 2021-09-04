using System.Threading.Tasks;
using API.Models;
using API.Models.products;

namespace API.Contracts.pages.products
{
    public interface IProductTypeRepository : IRepositoryBase<ProductType>
    {
        Task<ProductType> getTypeByName(string name);
    }
}