using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Contracts.pages.products;
using API.Data;
using API.Models.products;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.products
{
    public class ProductCategoryRepository : IProductCategoryRepository
    {

        private readonly resortDbContext _db;

        public ProductCategoryRepository(resortDbContext db)
        {
            _db = db;
        }


        public async Task<bool> Create(ProductCategory entity)
        {
            await _db.ProductCategories.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(ProductCategory entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<ProductCategory>> FindAll()
        {
            return await _db.ProductCategories
                .Include(n => n.user)
                .ToListAsync();
        }

        public async Task<ProductCategory> FindById(Guid id)
        {
            return await _db.ProductCategories
                    .Include(n => n.user)
                   .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<ProductCategory> GetCategoryByName(string categoryName)
        {
            return await _db.ProductCategories
                            .Include(n => n.user)
                            .FirstOrDefaultAsync(n => n.name.ToLower() == categoryName.ToLower());
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(ProductCategory entity)
        {
            _db.ProductCategories.Update(entity);
            return await Save();
        }
    }
}