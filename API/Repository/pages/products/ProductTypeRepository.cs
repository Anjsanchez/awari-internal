using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.products;
using API.Data;
using API.Models.products;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.products
{
    public class ProductTypeRepository : IProductTypeRepository
    {
        private readonly resortDbContext _db;

        public ProductTypeRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(ProductType entity)
        {

            await _db.ProductTypes.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(ProductType entity)
        {
            throw new System.NotImplementedException();
        }

        public async Task<ICollection<ProductType>> FindAll(bool isActiveOnly = false)
        {
            return await _db.ProductTypes.Include(n => n.user).ToListAsync();
        }

        public async Task<ProductType> FindById(Guid id)
        {
            return await _db.ProductTypes
         .Include(n => n.user)
        .FirstOrDefaultAsync(n => n._id == id);

        }

        public async Task<ProductType> getTypeByName(string name)
        {
            var data = await FindAll();
            return data.FirstOrDefault(w => w.name == name);
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;

        }

        public async Task<bool> Update(ProductType entity)
        {
            _db.ProductTypes.Update(entity);
            return await Save();

        }
    }
}