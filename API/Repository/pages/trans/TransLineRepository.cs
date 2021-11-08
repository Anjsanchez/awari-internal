using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.trans;
using API.Data;
using API.Models.trans;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.trans
{
    public class TransLineRepository : ITransLineRepository
    {
        private readonly resortDbContext _db;

        public TransLineRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(TransLine entity)
        {
            await _db.TransLines.AddAsync(entity);
            return await Save();
        }

        public async Task<bool> createRange(List<TransLine> lines)
        {
            await _db.TransLines.AddRangeAsync(lines);
            return await Save();
        }

        public async Task<bool> Delete(TransLine entity)
        {
            _db.TransLines.Remove(entity);
            return await Save();
        }

        public async Task<bool> deleteRange(List<TransLine> lines)
        {
            _db.TransLines.RemoveRange(lines);
            return await Save();
        }

        public async Task<ICollection<TransLine>> FindAll(bool isActiveOnly = false)
        {
            return await _db.TransLines
             .Include(n => n.discount)
             .Include(n => n.product)
             .Include(n => n.product.productCategory)
             .Include(n => n.transHeader)
             .Include(n => n.transRoom.room)
             .Include(n => n.transHeader.reservationType)
             .Include(n => n.transHeader.Customer)

             .Include(n => n.transRoom)
             .Include(n => n.user)
             .ToListAsync();
        }

        public async Task<ICollection<TransLine>> FindAllTrans(bool isActiveOnly = false, bool filterTransTodayOnly = true)
        {
            if (filterTransTodayOnly)
                return await _db.TransLines
               .Include(n => n.product)
               .Include(n => n.product.productCategory)
               .Where(n => n.createdDate == DateTime.Now)
               .ToListAsync();

            return await _db.TransLines
                .Include(n => n.product)
                .Include(n => n.product.productCategory)
                .ToListAsync();
        }

        public async Task<TransLine> FindById(Guid id)
        {
            return await _db.TransLines
             .Include(n => n.discount)
             .Include(n => n.product)
             .Include(n => n.product.productCategory)
             .Include(n => n.transHeader)
             .Include(n => n.transRoom)
             .Include(n => n.user)
                  .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<List<TransLine>> GetTransByHeaderId(Guid headerId)
        {
            var datas = await FindAll();

            return datas.Where(n => n.transHeaderId == headerId).ToList();
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(TransLine entity)
        {
            _db.TransLines.Update(entity);
            return await Save();
        }
    }
}