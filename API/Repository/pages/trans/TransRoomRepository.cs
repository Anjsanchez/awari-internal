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
    public class TransRoomRepository : ITransRoomRepository
    {
        private readonly resortDbContext _db;

        public TransRoomRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(TransRoom entity)
        {
            await _db.TransRooms.AddAsync(entity);
            return await Save();
        }

        public async Task<bool> createRange(List<TransRoom> lines)
        {

            await _db.TransRooms.AddRangeAsync(lines);
            return await Save();
        }

        public async Task<bool> Delete(TransRoom entity)
        {
            _db.TransRooms.Remove(entity);
            return await Save();
        }

        public async Task<bool> deleteRange(List<TransRoom> lines)
        {
            _db.TransRooms.RemoveRange(lines);
            return await Save();
        }

        public async Task<ICollection<TransRoom>> FindAll(bool isActiveOnly = false)
        {
            return await _db.TransRooms
                        .Include(n => n.user)
                        .Include(n => n.room)
                        .Include(n => n.discount)
                        .Include(n => n.transHeader.Customer)
                        .Include(n => n.transHeader.reservationType)
                        .Include(n => n.transHeader)
                        .Include(n => n.room.RoomVariant)
                        .ToListAsync();
        }

        public async Task<TransRoom> FindById(Guid id)
        {
            return await _db.TransRooms
                        .Include(n => n.user)
                        .Include(n => n.room)
                        .Include(n => n.discount)
                        .Include(n => n.transHeader)
                        .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<ICollection<TransRoom>> getLineByDates(DateTime fromDate, DateTime toDate)
        {

            var transs = await FindAll();
            return transs.Where(n => n.startDate >= fromDate && n.endDate <= toDate).ToList();

        }

        public async Task<List<TransRoom>> GetLineByHeaderId(Guid headerId)
        {
            var xlines = await FindAll();

            var z = xlines.Where(n => n.transHeaderId == headerId).ToList();

            return z;
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(TransRoom entity)
        {
            _db.TransRooms.Update(entity);
            return await Save();
        }
    }
}