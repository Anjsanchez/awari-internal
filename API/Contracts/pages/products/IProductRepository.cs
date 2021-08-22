using System.Threading.Tasks;
using API.Models.products;

namespace API.Contracts.pages.products
{
    public interface IProductRepository : IRepositoryBase<Product>
    {
        Task<Product> GetProductByName(string productName);
    }
}