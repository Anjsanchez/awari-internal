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
    public class TransPaymentRepository : ITransPaymentRepository
    {
        private readonly resortDbContext _db;

        public TransPaymentRepository(resortDbContext db)
        {
            _db = db;
        }


        public async Task<bool> Create(TransPayment entity)
        {
            await _db.TransPayments.AddAsync(entity);
            return await Save();
        }

        public async Task<bool> createRange(List<TransPayment> lines)
        {
            await _db.TransPayments.AddRangeAsync(lines);
            return await Save();
        }


        public async Task<bool> deleteRange(List<TransPayment> lines)
        {
            _db.TransPayments.RemoveRange(lines);
            return await Save();
        }

        public async Task<bool> Delete(TransPayment entity)
        {
            _db.TransPayments.Remove(entity);
            return await Save();
        }


        public async Task<ICollection<TransPayment>> FindAll(bool isActiveOnly = false)
        {
            return await _db.TransPayments
                        .Include(n => n.transHeader)
                        .Include(n => n.payment)
                        .Include(n => n.user)
                         .ToListAsync();
        }

        public async Task<TransPayment> FindById(Guid id)
        {
            return await _db.TransPayments
                            .Include(n => n.transHeader)
                            .Include(n => n.payment)
                            .Include(n => n.user)
                            .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<List<TransPayment>> GetPaymentByHeaderId(Guid headerId)
        {
            var xpayments = await FindAll();

            var z = xpayments.Where(n => n.transHeaderId == headerId).ToList();

            return z;
        }


        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(TransPayment entity)
        {
            _db.TransPayments.Update(entity);
            return await Save();
        }
    }
}