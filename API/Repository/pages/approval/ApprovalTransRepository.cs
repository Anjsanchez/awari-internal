using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Contracts.pages.approval;
using API.Data;
using API.Models.approval;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.approval
{
    public class ApprovalTransRepository : IApprovalTransRepository
    {

        private readonly resortDbContext _db;

        public ApprovalTransRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(ApprovalTrans entity)
        {
            await _db.ApprovalTrans.AddAsync(entity);
            return await Save();
        }

        public async Task<bool> Delete(ApprovalTrans entity)
        {
            _db.ApprovalTrans.Remove(entity);
            return await Save();

        }

        public async Task<ICollection<ApprovalTrans>> FindAll(bool isActiveOnly = false)
        {
            var hey = await _db.ApprovalTrans
                           .Include(n => n.discount)
                   .Include(n => n.product)
                   .Include(n => n.product.productCategory)
                   .Include(n => n.reservationRoom)
                         .ToListAsync();

            return hey;
        }

        public async Task<ApprovalTrans> FindById(Guid id)
        {
            return await _db.ApprovalTrans
                                  .Include(n => n.discount)
             .Include(n => n.product)
             .Include(n => n.product.productCategory)
             .Include(n => n.reservationRoom)
                            .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(ApprovalTrans entity)
        {
            _db.ApprovalTrans.Update(entity);
            return await Save();
        }
    }
}