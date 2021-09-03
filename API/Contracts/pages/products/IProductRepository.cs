using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.products;
using Microsoft.AspNetCore.Http;

namespace API.Contracts.pages.products
{
    public interface IProductRepository : IRepositoryBase<Product>
    {
        Task<Product> GetProductByName(string productName);
        Task<IEnumerable<Product>> GetProductsWithImage(HttpRequest request);
    }
}