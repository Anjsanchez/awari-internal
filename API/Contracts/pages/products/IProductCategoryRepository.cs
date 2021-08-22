using System.Threading.Tasks;
using API.Models.products;

namespace API.Contracts.pages.products
{
    public interface IProductCategoryRepository : IRepositoryBase<ProductCategory>
    {
        Task<ProductCategory> GetCategoryByName(string categoryName);
    }
}