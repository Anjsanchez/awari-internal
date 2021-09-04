using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.products;
using API.Data;
using API.Models.products;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
namespace API.Repository.pages.products
{
    public class ProductRepository : IProductRepository
    {

        private readonly resortDbContext _db;

        public ProductRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(Product entity)
        {
            await _db.Products.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(Product entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Product>> FindAll(bool isActiveOnly = false)
        {
            var products = await _db.Products
                .Include(n => n.productCategory)
                .Include(n => n.user)
                .ToListAsync();

            if (isActiveOnly)
                products = products.Where(n => n.isActive == true).ToList();

            return products;
        }



        public async Task<Product> FindById(Guid id)
        {
            return await _db.Products
                .Include(n => n.productCategory)
                .Include(n => n.user)
                .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<Product> GetProductByName(string productName)
        {
            return await _db.Products
                                .Include(n => n.user)
                                .Include(n => n.productCategory)
                                .FirstOrDefaultAsync(n => n.longName.ToLower() == productName.ToLower());
        }

        public async Task<IEnumerable<Product>> GetProductsWithImage(HttpRequest request)
        {
            var products = await FindAll();

            var z = products.Select(n => new Product()
            {
                _id = n._id,
                costPrice = n.costPrice,
                createdDate = n.createdDate,
                ImageFile = n.ImageFile,
                ImageName = n.ImageName,
                ImageSrc = String.Format("{0}://{1}{2}/Images/products/{3}", request.Scheme, request.Host, request.PathBase, n.ImageName),
                isActive = n.isActive,
                isActivityType = n.isActivityType,
                description = n.description,
                longName = n.longName,
                numberOfServing = n.numberOfServing,
                productCategory = n.productCategory,
                sellingPrice = n.sellingPrice,
                shortName = n.shortName,
                productCategoryId = n.productCategoryId,
                user = n.user,
                userId = n.userId
            });

            return z;
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(Product entity)
        {
            _db.Products.Update(entity);
            return await Save();
        }
    }
}