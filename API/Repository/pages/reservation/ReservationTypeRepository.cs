using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Contracts.pages.reservation;
using API.Data;
using API.Models.reservation;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.reservation
{
    public class ReservationTypeRepository : IReservationTypeRepository
    {
        private readonly resortDbContext _db;

        public ReservationTypeRepository(resortDbContext db)
        {
            _db = db;
        }


        public async Task<bool> Create(ReservationType entity)
        {
            await _db.ReservationTypes.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(ReservationType entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<ReservationType>> FindAll()
        {
            return await _db.ReservationTypes
                         .ToListAsync();
        }

        public async Task<ReservationType> FindById(Guid id)
        {
            return await _db.ReservationTypes
                            .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<ReservationType> GetTypeByName(string taskName)
        {
            return await _db.ReservationTypes
                       .FirstOrDefaultAsync(n => n.name.ToLower() == taskName.ToLower());
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(ReservationType entity)
        {
            _db.ReservationTypes.Update(entity);
            return await Save();
        }
    }
}