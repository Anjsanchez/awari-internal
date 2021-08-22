using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Contracts.pages.functionality;
using API.Data;
using API.Models.functionality;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.functionality
{
    public class DiscountRepository : IDiscountRepository
    {
        private readonly resortDbContext _db;

        public DiscountRepository(resortDbContext db)
        {
            _db = db;
        }


        public async Task<bool> Create(Discount entity)
        {
            await _db.Discounts.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(Discount entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Discount>> FindAll()
        {
            return await _db.Discounts
                .Include(n => n.user)
                .ToListAsync();
        }

        public async Task<Discount> FindById(Guid id)
        {
            return await _db.Discounts
                .Include(n => n.user)
                    .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<Discount> GetByName(string discountName)
        {
            return await _db.Discounts
                .Include(n => n.user)
                               .FirstOrDefaultAsync(n => n.name.ToLower() == discountName.ToLower());
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(Discount entity)
        {
            _db.Discounts.Update(entity);
            return await Save();
        }
    }
}