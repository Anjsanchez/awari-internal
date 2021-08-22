using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Contracts.pages.products;
using API.Data;
using API.Models.products;
using Microsoft.EntityFrameworkCore;

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

        public async Task<ICollection<Product>> FindAll()
        {
            return await _db.Products
                .Include(n => n.productCategory)
                .Include(n => n.user)
                .ToListAsync();
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