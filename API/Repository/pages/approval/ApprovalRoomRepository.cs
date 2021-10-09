using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Contracts.pages.approval;
using API.Data;
using API.Models.approval;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.approval
{
    public class ApprovalRoomRepository : IApprovalRoomRepository
    {

        private readonly resortDbContext _db;

        public ApprovalRoomRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(ApprovalRoom entity)
        {
            await _db.ApprovalRooms.AddAsync(entity);
            return await Save();
        }

        public async Task<bool> Delete(ApprovalRoom entity)
        {
            _db.ApprovalRooms.Remove(entity);
            return await Save();

        }

        public async Task<ICollection<ApprovalRoom>> FindAll(bool isActiveOnly = false)
        {
            var hey = await _db.ApprovalRooms
                        .Include(n => n.room)
                        .Include(n => n.discount)
                        .Include(n => n.reservationType)
                         .ToListAsync();

            return hey;
        }

        public async Task<ApprovalRoom> FindById(Guid id)
        {
            return await _db.ApprovalRooms
                        .Include(n => n.room)
                        .Include(n => n.discount)
                        .Include(n => n.reservationType)
                        .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(ApprovalRoom entity)
        {
            _db.ApprovalRooms.Update(entity);
            return await Save();
        }
    }
}