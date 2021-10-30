using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Contracts.pages.approval;
using API.Data;
using API.Models.approval;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.approval
{
    public class ApprovalHeadersRepository : IApprovalHeaderRepository
    {

        private readonly resortDbContext _db;

        public ApprovalHeadersRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(ApprovalHeader entity)
        {
            await _db.ApprovalHeaders.AddAsync(entity);
            return await Save();
        }

        public async Task<bool> Delete(ApprovalHeader entity)
        {
            _db.ApprovalHeaders.Remove(entity);
            return await Save();

        }

        public async Task<ICollection<ApprovalHeader>> FindAll(bool isActiveOnly = false)
        {
            var hey = await _db.ApprovalHeaders
                        .Include(n => n.Customer)
                        .Include(n => n.reservationType)
                        .Include(n => n.user)
                         .ToListAsync();

            return hey;
        }

        public async Task<ApprovalHeader> FindById(Guid id)
        {
            return await _db.ApprovalHeaders
                         .Include(n => n.Customer)
                        .Include(n => n.reservationType)
                        .Include(n => n.user)
                            .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(ApprovalHeader entity)
        {
            _db.ApprovalHeaders.Update(entity);
            return await Save();
        }
    }
}