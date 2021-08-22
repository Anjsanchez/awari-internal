using Microsoft.Win32.SafeHandles;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Contracts.pages.rooms;
using API.Data;
using API.Models.rooms;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using API.Models;

namespace API.Repository.pages.rooms
{
    public class RoomRepository : IRoomRepository
    {
        private readonly resortDbContext _db;

        public RoomRepository(resortDbContext db)
        {
            _db = db;
        }
        public async Task<bool> Create(Room entity)
        {
            await _db.Rooms.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(Room entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Room>> FindAll()
        {
            return await _db.Rooms
                 .Include(n => n.user)
                 .Include(n => n.RoomVariant)
                 .ToListAsync();
        }

        private async Task<ICollection<RoomPricing>> getAllRoomPricing()
        {
            return await _db.RoomPricings
                 .ToListAsync();
        }

        public async Task<Room> FindById(Guid id)
        {
            return await _db.Rooms
                  .Include(n => n.user)
                  .Include(n => n.RoomVariant)
                  .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<IEnumerable<Room>> GetRoomWithPricing()
        {

            var room = await FindAll();
            var rmPricing = await getAllRoomPricing();

            var mapped = (from m in room
                          join r in rmPricing on m._id equals r.roomId
                          select m).Distinct();

            return mapped;
        }

        public async Task<Room> GetRoomByName(string roomName)
        {
            return await _db.Rooms
                    .Include(n => n.user)
                    .Include(n => n.RoomVariant)
                    .FirstOrDefaultAsync(n => n.roomLongName.ToLower() == roomName.ToLower());
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(Room entity)
        {
            _db.Rooms.Update(entity);
            return await Save();
        }
    }
}