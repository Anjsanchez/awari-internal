using System;
using System.Collections.Generic;
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

        public Task<bool> Create(ProductType entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(ProductType entity)
        {
            throw new System.NotImplementedException();
        }

        public async Task<ICollection<ProductType>> FindAll(bool isActiveOnly = false)
        {
            return await _db.ProductTypes.ToListAsync();
        }

        public Task<ProductType> FindById(Guid id)
        {
            throw new System.NotImplementedException();

        }

        public Task<ProductType> getTypeByName(string name)
        {
            throw new System.NotImplementedException();

        }

        public Task<bool> Save()
        {
            throw new System.NotImplementedException();

        }

        public Task<bool> Update(ProductType entity)
        {
            throw new System.NotImplementedException();

        }
    }
}