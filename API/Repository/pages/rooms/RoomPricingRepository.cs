using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.rooms;
using API.Data;
using API.Models.rooms;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.rooms
{
    public class RoomPricingRepository : IRoomPricingRepository
    {

        private readonly resortDbContext _db;

        public RoomPricingRepository(resortDbContext db)
        {
            _db = db;
        }


        public async Task<bool> Create(RoomPricing entity)
        {
            await _db.RoomPricings.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(RoomPricing entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<RoomPricing>> FindAll()
        {
            return await _db.RoomPricings
                            .Include(n => n.room)
                            .Include(n => n.room.RoomVariant)
                            .Include(n => n.user)
                            .ToListAsync();
        }

        public async Task<RoomPricing> FindById(Guid id)
        {
            return await _db.RoomPricings
                            .Include(n => n.room)
                            .Include(n => n.room.RoomVariant)
                             .Include(n => n.user)
                            .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<List<RoomPricing>> getPricingByRoomId(Guid roomId)
        {
            var roomPricings = await FindAll();
            return roomPricings.Where(q => q.roomId == roomId).ToList();
        }

        public async Task<List<RoomPricing>> getPricingByRoomVariantId(Guid variantId)
        {
            var roomPricing = await FindAll();
            var filteredPricing = roomPricing.Where(q => q.room.RoomVariantId == variantId).ToList();

            return filteredPricing;
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(RoomPricing entity)
        {
            _db.RoomPricings.Update(entity);
            return await Save();
        }


    }
}