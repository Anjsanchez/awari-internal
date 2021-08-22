using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts;
using API.Contracts.pages.rooms;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.rooms
{
    public class RoomVariantRepository : IRoomVariantRepository
    {
        private readonly resortDbContext _db;

        public RoomVariantRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(RoomVariant entity)
        {
            await _db.RoomVariants.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(RoomVariant entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<RoomVariant>> FindAll()
        {
            return await _db.RoomVariants
                            .Include(n => n.user)
                            .ToListAsync();
        }

        public async Task<RoomVariant> FindById(Guid id)
        {
            return await _db.RoomVariants
                            .Include(n => n.user)
                            .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<List<RoomVariant>> getActiveVariants()
        {
            var variants = await FindAll();
            return variants.Where(q => q.isActive == true).ToList();
        }

        public async Task<RoomVariant> getVariantByName(string roomVariant)
        {
            return await _db.RoomVariants
                            .Include(n => n.user)
                            .FirstOrDefaultAsync(n => n.name.ToLower() == roomVariant.ToLower());
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(RoomVariant entity)
        {
            _db.RoomVariants.Update(entity);
            return await Save();
        }
    }
}