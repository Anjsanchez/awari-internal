using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.approval;
using API.Data;
using API.Models.approval;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.approval
{
    public class ReservationApprovalRepository : IReservationApprovalRepository
    {
        private readonly resortDbContext _db;

        public ReservationApprovalRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(ReservationApproval entity)
        {
            await _db.ReservationApprovals.AddAsync(entity);
            return await Save();
        }

        public async Task<bool> Delete(ReservationApproval entity)
        {
            _db.ReservationApprovals.Remove(entity);
            return await Save();
        }

        public async Task<ICollection<ReservationApproval>> FindAll(bool isActiveOnly = false)
        {

            var hey = await _db.ReservationApprovals
            .Include(n => n.requestedBy)
            .Include(n => n.approvedBy)
            .ToListAsync();

            var roomWithHeader = (from p in hey
                                  orderby p.requestedDate ascending
                                  select p).ToList();

            return roomWithHeader;
        }

        public async Task<ReservationApproval> FindById(Guid id)
        {
            return await _db.ReservationApprovals
                 .Include(n => n.requestedBy)
            .Include(n => n.approvedBy)
                .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(ReservationApproval entity)
        {
            _db.ReservationApprovals.Update(entity);
            return await Save();
        }
    }
}