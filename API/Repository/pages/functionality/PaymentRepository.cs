using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Contracts.pages.functionality;
using API.Data;
using API.Models.functionality;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.functionality
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly resortDbContext _db;

        public PaymentRepository(resortDbContext db)
        {
            _db = db;
        }


        public async Task<bool> Create(Payment entity)
        {
            await _db.Payments.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(Payment entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Payment>> FindAll()
        {
            return await _db.Payments
                .Include(n => n.user)
                .ToListAsync();
        }

        public async Task<Payment> FindById(Guid id)
        {
            return await _db.Payments
                .Include(n => n.user)
                    .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<Payment> GetByName(string paymentName)
        {
            return await _db.Payments
                .Include(n => n.user)
                               .FirstOrDefaultAsync(n => n.name.ToLower() == paymentName.ToLower());
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(Payment entity)
        {
            _db.Payments.Update(entity);
            return await Save();
        }
    }
}