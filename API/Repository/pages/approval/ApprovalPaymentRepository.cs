using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Contracts.pages.approval;
using API.Data;
using API.Models.approval;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.approval
{
    public class ApprovalPaymentRepository : IApprovalPaymentRepository
    {

        private readonly resortDbContext _db;

        public ApprovalPaymentRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(ApprovalPayment entity)
        {
            await _db.ApprovalPayments.AddAsync(entity);
            return await Save();
        }

        public async Task<bool> Delete(ApprovalPayment entity)
        {
            _db.ApprovalPayments.Remove(entity);
            return await Save();

        }

        public async Task<ICollection<ApprovalPayment>> FindAll(bool isActiveOnly = false)
        {
            var hey = await _db.ApprovalPayments
                        .Include(n => n.payment)
                        .Include(n => n.user)
                         .ToListAsync();

            return hey;
        }

        public async Task<ApprovalPayment> FindById(Guid id)
        {
            return await _db.ApprovalPayments
                            .Include(n => n.payment)
                            .Include(n => n.user)
                            .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(ApprovalPayment entity)
        {
            _db.ApprovalPayments.Update(entity);
            return await Save();
        }
    }
}